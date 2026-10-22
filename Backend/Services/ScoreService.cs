using Backend.Models;

namespace Backend.Services
{
    public class ScoreService
    {
        // Lista em memória para armazenar as pontuações registradas
        private readonly List<Score> _scores = new();
        private int _proximoId = 1;

        // Adiciona uma nova pontuação
        public Score AdicionarPontuacao(Score score)
        {
            score.Id = _proximoId++;
            _scores.Add(score);
            return score;
        }

        // Retorna as 10 maiores pontuações registradas no geral
        public List<Score> ObterRanking()
        {
            return _scores
                .GroupBy(s => s.Jogador.Trim().ToLower()) // Agrupa ignorando maiúsculas e minúsculas
                .Select(g => new Score
                {
                    Jogador = g.First().Jogador, // Mantém o nome original da primeira partida
                    Pontos = g.Max(s => s.Pontos), // Pega só a MAIOR pontuação do jogador
                    DataPartida = g.OrderByDescending(s => s.Pontos).First().DataPartida
                })
                .OrderByDescending(s => s.Pontos) // Ordena as melhores marcas
                .Take(10)
                .ToList();
        }

        // Calcula e retorna as estatísticas de um jogador específico
        public PlayerStats? ObterEstatisticasJogador(string nomeJogador)
        {
            var partidasDoJogador = _scores
                .Where(s => s.Jogador.Equals(nomeJogador, StringComparison.OrdinalIgnoreCase))
                .OrderBy(s => s.DataPartida)
                .ToList();

            if (!partidasDoJogador.Any())
                return null;

            int recordeAtual = 0;
            int vezesBateuRecorde = 0;

            foreach (var partida in partidasDoJogador)
            {
                if (partida.Pontos > recordeAtual)
                {
                    // A primeira partida registra o recorde inicial,
                    // as seguintes que superarem contam como novo recorde.
                    if (recordeAtual > 0)
                    {
                        vezesBateuRecorde++;
                    }
                    recordeAtual = partida.Pontos;
                }
            }

            var primeiraPartida = partidasDoJogador.First().DataPartida;
            var ultimaPartida = partidasDoJogador.Last().DataPartida;
            var diferencaTempo = ultimaPartida - primeiraPartida;

            string tempoQueJoga = CalcularTempoFormatado(diferencaTempo);

            return new PlayerStats
            {
                Jogador = nomeJogador,
                PartidasJogadas = partidasDoJogador.Count,
                MediaPontuacao = Math.Round(partidasDoJogador.Average(s => s.Pontos), 2),
                MaiorPontuacao = partidasDoJogador.Max(s => s.Pontos),
                MenorPontuacao = partidasDoJogador.Min(s => s.Pontos),
                VezesBateuRecorde = vezesBateuRecorde,
                TempoQueJoga = tempoQueJoga
            };
        }

        private string CalcularTempoFormatado(TimeSpan diferenca)
        {
            int dias = (int)diferenca.TotalDays;

            if (dias >= 365)
            {
                int anos = dias / 365;
                return $"{anos} {(anos == 1 ? "ano" : "anos")}";
            }
            if (dias >= 30)
            {
                int meses = dias / 30;
                return $"{meses} {(meses == 1 ? "mês" : "meses")}";
            }
            if (dias > 0)
            {
                return $"{dias} {(dias == 1 ? "dia" : "dias")}";
            }

            return "Menos de 1 dia";
        }
    } 
}