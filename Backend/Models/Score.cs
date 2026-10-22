namespace Backend.Models
{
    public class Score
    {
        public int Id { get; set; }
        public string Jogador { get; set; } = string.Empty;
        public int Pontos { get; set; }
        public DateTime DataPartida { get; set; }
    }
}