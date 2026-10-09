import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-modos',
  templateUrl: './modos.component.html',
  styleUrls: ['./modos.component.scss']
})
export class ModosComponent {

  botaoAtivo: any = null;

  botaoValido(vl: number): void {
    this.botaoAtivo = vl;
  }

  constructor(private appComponent: AppComponent) {}

  trocarTag(opcao: string) {

    this.appComponent.trocarTag(opcao);
  }  
}