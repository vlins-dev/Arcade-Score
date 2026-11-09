import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Score } from './score.service';

@Injectable({
  providedIn: 'root'
})
export class ModosService {
  // Estado da tela atual
  private telaAtualSubject = new BehaviorSubject<string>('registrar');
  telaAtual$ = this.telaAtualSubject.asObservable();

  // Estado do jogador selecionado para detalhes
  jogadorSelecionado: string = '';

  // Estado da pontuação selecionada para edição
  scoreEmEdicao: Score | null = null;

  trocarTag(novaTela: string): void {
    this.telaAtualSubject.next(novaTela);
  }

  selecionarJogador(nomeJogador: string): void {
    this.jogadorSelecionado = nomeJogador;
  }

  iniciarEdicao(score: Score): void {
    this.scoreEmEdicao = score;
    this.trocarTag('registrar');
  }

  limparEdicao(): void {
    this.scoreEmEdicao = null;
  }
}