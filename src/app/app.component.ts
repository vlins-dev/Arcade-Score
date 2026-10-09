import { Component } from '@angular/core';
import { ModosComponent } from './components/modos/modos.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { DetalhesComponent } from './components/detalhes/detalhes.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  componenteAtual: any = null;

  trocarTag(opcao: string) {
    switch (opcao) {
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
  }
}