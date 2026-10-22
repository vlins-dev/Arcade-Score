import { Component, OnInit } from '@angular/core';
import { ModosService } from './services/modos.service';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { DetalhesComponent } from './components/detalhes/detalhes.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  componenteAtual: any = RegistrarComponent;

  constructor(private modosService: ModosService) {}

  ngOnInit(): void {
    this.modosService.telaAtual$.subscribe((tela) => {
      switch (tela) {
        case 'registrar':
          this.componenteAtual = RegistrarComponent;
          break;
        case 'ranking':
          this.componenteAtual = RankingComponent;
          break;
        case 'detalhes':
          this.componenteAtual = DetalhesComponent;
          break;
      }
    });
  }
}