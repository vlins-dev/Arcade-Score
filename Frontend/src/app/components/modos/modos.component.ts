import { Component, OnInit } from '@angular/core';
import { ModosService } from '../../services/modos.service';

@Component({
  selector: 'app-modos',
  templateUrl: './modos.component.html',
  styleUrls: ['./modos.component.scss']
})
export class ModosComponent implements OnInit {
  botaoAtivo: number = 1;

  constructor(private modosService: ModosService) {}

  ngOnInit(): void {
    this.modosService.telaAtual$.subscribe((tela) => {
      if (tela === 'registrar') this.botaoAtivo = 1;
      if (tela === 'ranking' || tela === 'detalhes') this.botaoAtivo = 2;
    });
  }

  botaoValido(numero: number): void {
    this.botaoAtivo = numero;
  }

  trocarTag(tela: string): void {
    this.modosService.trocarTag(tela);
  }
}