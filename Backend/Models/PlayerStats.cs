namespace Backend.Models
{
    public class PlayerStats
    {
        public string Jogador { get; set; } = string.Empty;
        public int PartidasJogadas { get; set; }
        public double MediaPontuacao { get; set; }
        public int MaiorPontuacao { get; set; }
        public int MenorPontuacao { get; set; }
        public int VezesBateuRecorde { get; set; }
        public string TempoQueJoga { get; set; } = string.Empty;
    }
}