import { Component, OnInit } from '@angular/core';
import { ScoreService, Score } from '../../services/score.service';
import { ModosService } from '../../services/modos.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
  data: string = '';
  pontuacao: string = '';
  jogador: string = '';

  idEdicao: number | null = null;
  modoEdicao: boolean = false;

  constructor(
    private scoreService: ScoreService,
    private modosService: ModosService
  ) {}

  ngOnInit(): void {
    if (this.modosService.scoreEmEdicao) {
      const score = this.modosService.scoreEmEdicao;
      this.modoEdicao = true;
      this.idEdicao = score.id ?? null;
      this.jogador = score.jogador;
      this.pontuacao = score.pontos.toString();

      if (score.dataPartida) {
        this.data = score.dataPartida.split('T')[0];
      }
    }
  }

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
    if (isNaN(valorPontos) || valorPontos < 0) {
      alert('A pontuação informada é inválida.');
      return;
    }

    const payloadScore: Score = {
      jogador: this.jogador.trim(),
      pontos: valorPontos,
      dataPartida: new Date(this.data).toISOString()
    };

    if (this.modoEdicao && this.idEdicao !== null) {
      this.scoreService.atualizarPontuacao(this.idEdicao, payloadScore).subscribe({
        next: () => {
          alert('Pontuação atualizada com sucesso!');
          this.cancelar();
        },
        error: (err: any) => {
          const mensagemErro = err.error?.mensagem || 'Erro ao atualizar pontuação.';
          alert(mensagemErro);
        }
      });
    } else {
      this.scoreService.registrarPontuacao(payloadScore).subscribe({
        next: () => {
          alert('Pontuação registrada com sucesso!');
          this.limparCampos();
        },
        error: (err: any) => {
          const mensagemErro = err.error?.mensagem || 'Erro ao registrar pontuação.';
          alert(mensagemErro);
        }
      });
    }
  }

  cancelar(): void {
    this.limparCampos();
    this.modosService.limparEdicao();
    this.modosService.trocarTag('ranking');
  }

  private limparCampos(): void {
    this.data = '';
    this.pontuacao = '';
    this.jogador = '';
    this.idEdicao = null;
    this.modoEdicao = false;
  }
}