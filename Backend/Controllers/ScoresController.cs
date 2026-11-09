using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScoresController : ControllerBase
    {
        private readonly ScoreService _scoreService;

        public ScoresController(ScoreService scoreService)
        {
            _scoreService = scoreService;
        }

        // POST: api/scores -> Registrar pontuação
        [HttpPost]
        public IActionResult RegistrarPontuacao([FromBody] Score score)
        {
            if (score == null)
            {
                return BadRequest(new { mensagem = "Dados inválidos." });
            }

            if (string.IsNullOrWhiteSpace(score.Jogador))
            {
                return BadRequest(new { mensagem = "O nome do jogador não pode ficar vazio." });
            }

            if (score.Pontos < 0)
            {
                return BadRequest(new { mensagem = "A pontuação não pode ser negativa." });
            }

            var novoScore = _scoreService.AdicionarPontuacao(score);
            return CreatedAtAction(nameof(ObterPorId), new { id = novoScore.Id }, novoScore);
        }

        // GET: api/scores/{id} -> Obter pontuação por ID
        [HttpGet("{id:int}")]
        public ActionResult<Score> ObterPorId(int id)
        {
            var score = _scoreService.ObterPorId(id);
            if (score == null)
            {
                return NotFound(new { mensagem = "Registo não encontrado." });
            }

            return Ok(score);
        }

        // PUT: api/scores/{id} -> Editar pontuação existente
        [HttpPut("{id:int}")]
        public IActionResult AtualizarPontuacao(int id, [FromBody] Score score)
        {
            if (score == null)
            {
                return BadRequest(new { mensagem = "Dados inválidos." });
            }

            if (string.IsNullOrWhiteSpace(score.Jogador))
            {
                return BadRequest(new { mensagem = "O nome do jogador não pode ficar vazio." });
            }

            if (score.Pontos < 0)
            {
                return BadRequest(new { mensagem = "A pontuação não pode ser negativa." });
            }

            var scoreAtualizado = _scoreService.AtualizarPontuacao(id, score);
            if (scoreAtualizado == null)
            {
                return NotFound(new { mensagem = $"Não foi possível encontrar o registo com o ID {id}." });
            }

            return Ok(scoreAtualizado);
        }

        // GET: api/scores/ranking -> Obter o ranking dos Top 10
        [HttpGet("ranking")]
        public ActionResult<IEnumerable<Score>> ObterRanking()
        {
            var ranking = _scoreService.ObterRanking();
            return Ok(ranking);
        }

        // GET: api/scores/estatisticas/{jogador} -> Obter estatísticas do jogador
        [HttpGet("estatisticas/{jogador}")]
        public ActionResult<PlayerStats> ObterEstatisticas(string jogador)
        {
            var estatisticas = _scoreService.ObterEstatisticasJogador(jogador);

            if (estatisticas == null)
            {
                return NotFound(new { mensagem = $"Nenhuma pontuação encontrada para o jogador '{jogador}'." });
            }

            return Ok(estatisticas);
        }
    }
}