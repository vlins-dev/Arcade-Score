import { Component, OnInit } from '@angular/core';
import { ScoreService, EstatisticasJogador } from '../../services/score.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {
  nomeJogador: string = '';
  estatisticas: EstatisticasJogador | null = null;

  constructor(
    private scoreService: ScoreService,
    private appComponent: AppComponent
  ) {}

  ngOnInit(): void {
    this.nomeJogador = this.scoreService.getJogadorSelecionado();
    if (this.nomeJogador) {
      this.estatisticas = this.scoreService.getEstatisticasJogador(this.nomeJogador);
    }
  }

  fechar(): void {
    this.appComponent.trocarTag('ranking');
  }
}