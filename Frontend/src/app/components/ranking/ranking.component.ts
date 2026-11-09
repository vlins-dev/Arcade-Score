import { Component, OnInit } from '@angular/core';
import { ScoreService, Score } from '../../services/score.service';
import { ModosService } from '../../services/modos.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  rankingList: Array<Score> = [];
  jogadorSelecionadoMenu: Score | null = null;
  menuPosicao = { x: 0, y: 0 };

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
        this.rankingList = dados;
      },
      error: (err: unknown) => {
        console.error('Erro ao carregar o ranking:', err);
      }
    });
  }

  abrirMenuOpcoes(score: Score, event: MouseEvent): void {
    event.stopPropagation();

    if (this.jogadorSelecionadoMenu?.id === score.id) {
      this.fecharMenu();
      return;
    }

    const elemento = event.currentTarget as HTMLElement;
    const rect = elemento.getBoundingClientRect();

    // Posiciona logo à direita do nome do jogador
    this.menuPosicao = {
      x: rect.right + 8,
      y: rect.top
    };

    this.jogadorSelecionadoMenu = score;
  }

  fecharMenu(): void {
    this.jogadorSelecionadoMenu = null;
  }

  irParaDetalhes(jogador: string): void {
    this.modosService.selecionarJogador(jogador);
    this.modosService.trocarTag('detalhes');
    this.fecharMenu();
  }

  irParaEdicao(score: Score): void {
    this.modosService.iniciarEdicao(score);
    this.fecharMenu();
  }
}