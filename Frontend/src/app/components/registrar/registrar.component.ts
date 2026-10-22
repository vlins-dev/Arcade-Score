import { Component } from '@angular/core';
import { ScoreService, Score } from '../../services/score.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent {
  data: string = '';
  pontuacao: number | null = null;
  jogador: string = '';

  constructor(private scoreService: ScoreService) {}

  salvar(): void {
    if (!this.data || !this.pontuacao || !this.jogador.trim()) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const novoScore: Score = {
      jogador: this.jogador.trim(),
      pontos: Number(this.pontuacao),
      dataPartida: new Date(this.data).toISOString()
    };

    this.scoreService.registrarPontuacao(novoScore).subscribe({
      next: () => {
        alert('Pontuação registrada com sucesso!');
        this.limparCampos();
      },
      error: (err: unknown) => {
        console.error('Erro ao registrar pontuação:', err);
        alert('Erro ao registrar pontuação.');
      }
    });
  }

  private limparCampos(): void {
    this.data = '';
    this.pontuacao = null;
    this.jogador = '';
  }
}