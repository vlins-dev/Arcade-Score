import { Component, OnInit } from '@angular/core';
import { ScoreService, RankingItem } from '../../services/score.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  rankingList: RankingItem[] = [];

  constructor(
    private scoreService: ScoreService,
    private appComponent: AppComponent
  ) {}

  ngOnInit(): void {
    this.rankingList = this.scoreService.getRanking();
  }

  verDetalhes(nomeJogador: string): void {
    this.scoreService.setJogadorSelecionado(nomeJogador);
    this.appComponent.trocarTag('detalhes');
  }
}