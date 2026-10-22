import { Component, OnInit } from '@angular/core';
import { ScoreService, Score } from '../../services/score.service';
import { ModosService } from '../../services/modos.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  rankingList: Array<{ jogador: string; maiorPontuacao: number }> = [];

  constructor(
    private scoreService: ScoreService,
    private modosService: ModosService
  ) {}

  ngOnInit(): void {
    this.carregarRanking();
  }

  carregarRanking(): void {
    this.scoreService.obterRanking().subscribe({
      next: (dados: Score[]) => {
        this.rankingList = dados.map((item: Score) => ({
          jogador: item.jogador,
          maiorPontuacao: item.pontos
        }));
      },
      error: (err: unknown) => {
        console.error('Erro ao carregar o ranking:', err);
      }
    });
  }

  verDetalhes(nomeJogador: string): void {
    this.modosService.selecionarJogador(nomeJogador);
    this.modosService.trocarTag('detalhes');
  }
}