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
            
            // Verifica se o jogador já possui registros anteriores (ignorando maiúsculas/minúsculas)
            var jogadorExistente = _scores.FirstOrDefault(s => 
                s.Jogador.Trim().Equals(score.Jogador.Trim(), StringComparison.OrdinalIgnoreCase)
            );

            if (jogadorExistente != null)
            {
                // Registro normal: preserva a grafia original do nome que já existia
                score.Jogador = jogadorExistente.Jogador;
            }
            else
            {
                score.Jogador = score.Jogador.Trim();
            }

            _scores.Add(score);
            return score;
        }

        // Obtém uma pontuação específica por Id
        public Score? ObterPorId(int id)
        {
            return _scores.FirstOrDefault(s => s.Id == id);
        }

        // Atualiza uma pontuação existente
        public Score? AtualizarPontuacao(int id, Score scoreAtualizado)
        {
            var scoreExistente = ObterPorId(id);
            if (scoreExistente == null)
            {
                return null;
            }

            var novoNome = scoreAtualizado.Jogador.Trim();
            var nomeAntigo = scoreExistente.Jogador;

            scoreExistente.Jogador = novoNome;
            scoreExistente.Pontos = scoreAtualizado.Pontos;
            scoreExistente.DataPartida = scoreAtualizado.DataPartida;

            // Se o nome foi editado, padroniza as demais partidas desse mesmo jogador para o novo nome
            if (!string.Equals(nomeAntigo, novoNome, StringComparison.OrdinalIgnoreCase))
            {
                var outrasPartidas = _scores.Where(s => 
                    s.Id != id && s.Jogador.Equals(nomeAntigo, StringComparison.OrdinalIgnoreCase)
                );
                
                foreach (var partida in outrasPartidas)
                {
                    partida.Jogador = novoNome;
                }
            }

            return scoreExistente;
        }

        // Retorna as 10 maiores pontuações registradas no geral
        public List<Score> ObterRanking()
        {
            return _scores
                .GroupBy(s => s.Jogador.Trim().ToLower()) // Agrupa pelo nome em minúsculas
                .Select(g =>
                {
                    // Pega o registro com a maior pontuação
                    var melhorRegistro = g.OrderByDescending(s => s.Pontos).First();

                    // Pega o primeiro registro histórico para garantir que a grafia exibida seja a original
                    var primeiroRegistro = g.OrderBy(s => s.Id).First();

                    return new Score
                    {
                        Id = melhorRegistro.Id,
                        Jogador = primeiroRegistro.Jogador, // Mantém a grafia do primeiro cadastro
                        Pontos = melhorRegistro.Pontos,
                        DataPartida = melhorRegistro.DataPartida
                    };
                })
                .OrderByDescending(s => s.Pontos)
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
                Jogador = partidasDoJogador.First().Jogador, // Usa a grafia padronizada
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