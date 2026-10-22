import { Component, OnInit } from '@angular/core';
import { ScoreService, PlayerStats } from '../../services/score.service';
import { ModosService } from '../../services/modos.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {
  nomeJogador: string = '';
  estatisticas: PlayerStats | null = null;

  constructor(
    private scoreService: ScoreService,
    private modosService: ModosService
  ) {}

  ngOnInit(): void {
    this.nomeJogador = this.modosService.jogadorSelecionado;
    if (this.nomeJogador) {
      this.carregarEstatisticas(this.nomeJogador);
    }
  }

  carregarEstatisticas(jogador: string): void {
    this.scoreService.obterEstatisticasJogador(jogador).subscribe({
      next: (dados: PlayerStats) => {
        this.estatisticas = dados;
      },
      error: (err: unknown) => {
        console.error('Erro ao carregar estatísticas do jogador:', err);
        this.estatisticas = null;
      }
    });
  }

  fechar(): void {
    this.modosService.trocarTag('ranking');
  }
}