import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../../services/score.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
  data: string = '';
  pontuacao: number | null = null;
  jogador: string = '';

  constructor(private scoreService: ScoreService) {}

  ngOnInit(): void {}

  salvar(): void {
    if (!this.data || this.pontuacao === null || !this.jogador.trim()) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    this.scoreService.adicionarPartida({
      data: this.data,
      pontuacao: Number(this.pontuacao),
      jogador: this.jogador.trim()
    });

    this.data = '';
    this.pontuacao = null;
    this.jogador = '';

    alert('Pontuação salva com sucesso!');
  }
}