import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Score {
  id?: number;
  jogador: string;
  pontos: number;
  dataPartida: string;
}

export interface PlayerStats {
  jogador: string;
  nomeFormatado?: string;
  partidasJogadas: number;
  mediaPontuacao: number;
  maiorPontuacao: number;
  menorPontuacao: number;
  vezesBateuRecorde: number;
  tempoQueJoga: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private readonly apiUrl = 'http://localhost:5078/api/scores';

  constructor(private http: HttpClient) { }

  registrarPontuacao(score: Score): Observable<Score> {
    return this.http.post<Score>(this.apiUrl, score);
  }

  obterRanking(): Observable<Score[]> {
    return this.http.get<Score[]>(`${this.apiUrl}/ranking`);
  }

  obterEstatisticasJogador(jogador: string): Observable<PlayerStats> {
    return this.http.get<PlayerStats>(`${this.apiUrl}/estatisticas/${jogador}`);
  }
}