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
                return BadRequest("Dados inválidos.");
            }

            var novoScore = _scoreService.AdicionarPontuacao(score);
            return CreatedAtAction(nameof(ObterEstatisticas), new { jogador = novoScore.Jogador }, novoScore);
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
                return NotFound($"Nenhuma pontuação encontrada para o jogador '{jogador}'.");
            }

            return Ok(estatisticas);
        }
    }
}