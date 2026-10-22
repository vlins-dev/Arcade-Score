import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModosService {
  // Estado da tela atual
  private telaAtualSubject = new BehaviorSubject<string>('registrar');
  telaAtual$ = this.telaAtualSubject.asObservable();

  // Estado do jogador selecionado
  jogadorSelecionado: string = '';

  trocarTag(novaTela: string): void {
    this.telaAtualSubject.next(novaTela);
  }

  selecionarJogador(nomeJogador: string): void {
    this.jogadorSelecionado = nomeJogador;
  }
}