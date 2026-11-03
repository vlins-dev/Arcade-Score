import { Component } from '@angular/core';
import { ScoreService, Score } from '../../services/score.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent {
  data: string = '';
  pontuacao: string = '';
  jogador: string = '';

  constructor(private scoreService: ScoreService) {}

  permitirApenasNumeros(event: KeyboardEvent): void {
    const tecla = event.key;
    if (tecla < '0' || tecla > '9') {
      event.preventDefault();
    }
  }

  salvar(): void {
    if (!this.data || !this.pontuacao.trim() || !this.jogador.trim()) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const valorPontos = Number(this.pontuacao);
    if (isNaN(valorPontos)) {
      alert('A pontuação informada é inválida.');
      return;
    }

    const novoScore: Score = {
      jogador: this.jogador.trim(),
      pontos: valorPontos,
      dataPartida: new Date(this.data).toISOString()
    };

    this.scoreService.registrarPontuacao(novoScore).subscribe({
      next: () => {
        alert('Pontuação registrada com sucesso!');
        this.limparCampos();
      },
      error: (err) => {
        const mensagemErro = err.error?.mensagem || 'Erro ao registrar pontuação.';
        alert(mensagemErro);
      }
    });
  }

  private limparCampos(): void {
    this.data = '';
    this.pontuacao = '';
    this.jogador = '';
  }
}