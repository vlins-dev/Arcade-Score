import { Injectable } from '@angular/core';

export interface Partida {
  jogador: string;
  pontuacao: number;
  data: string;
}

export interface RankingItem {
  jogador: string;
  maiorPontuacao: number;
}

export interface EstatisticasJogador {
  nomeFormatado: string;
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
  private historicoCompleto: Partida[] = [];
  private jogadorSelecionado: string = '';

  constructor() {}

  adicionarPartida(partida: Partida): void {
    this.historicoCompleto.push(partida);
  }

  getHistorico(): Partida[] {
    return this.historicoCompleto;
  }

  setJogadorSelecionado(nome: string): void {
    this.jogadorSelecionado = nome;
  }

  getJogadorSelecionado(): string {
    return this.jogadorSelecionado;
  }

  getRanking(): RankingItem[] {
    const mapaRanking: { [chave: string]: { nomeExibicao: string; maiorPontuacao: number } } = {};

    this.historicoCompleto.forEach(p => {
      const chave = p.jogador.trim().toLowerCase();
      
      if (!mapaRanking[chave]) {
        mapaRanking[chave] = {
          nomeExibicao: p.jogador.trim(),
          maiorPontuacao: p.pontuacao
        };
      } else if (p.pontuacao > mapaRanking[chave].maiorPontuacao) {
        mapaRanking[chave].maiorPontuacao = p.pontuacao;
      }
    });

    return Object.keys(mapaRanking)
      .map(chave => ({
        jogador: mapaRanking[chave].nomeExibicao,
        maiorPontuacao: mapaRanking[chave].maiorPontuacao
      }))
      .sort((a, b) => b.maiorPontuacao - a.maiorPontuacao);
  }

  getEstatisticasJogador(nomeBusca: string): EstatisticasJogador | null {
    const chaveBusca = nomeBusca.trim().toLowerCase();

    const partidasDoJogador = this.historicoCompleto.filter(
      p => p.jogador.trim().toLowerCase() === chaveBusca
    );

    if (partidasDoJogador.length === 0) {
      return null;
    }

    const partidasOrdenadas = [...partidasDoJogador].sort(
      (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
    );

    const totalPartidas = partidasOrdenadas.length;
    const somaPontos = partidasOrdenadas.reduce((acc, p) => acc + p.pontuacao, 0);
    const mediaPontuacao = Number((somaPontos / totalPartidas).toFixed(2));

    const pontuacoes = partidasOrdenadas.map(p => p.pontuacao);
    const maiorPontuacao = Math.max(...pontuacoes);
    const menorPontuacao = Math.min(...pontuacoes);

    let vezesBateuRecorde = 0;
    if (totalPartidas > 1) {
      let recordeAtual = partidasOrdenadas[0].pontuacao;
      for (let i = 1; i < partidasOrdenadas.length; i++) {
        if (partidasOrdenadas[i].pontuacao > recordeAtual) {
          vezesBateuRecorde++;
          recordeAtual = partidasOrdenadas[i].pontuacao;
        }
      }
    }

    // Tempo que joga simplificado (Anos, Meses e Dias)
    const primeiraData = new Date(partidasOrdenadas[0].data);
    const ultimaData = new Date(partidasOrdenadas[totalPartidas - 1].data);

    let tempoQueJoga = 'Mesmo dia';

    if (primeiraData.getTime() !== ultimaData.getTime()) {
      let anos = ultimaData.getFullYear() - primeiraData.getFullYear();
      let meses = ultimaData.getMonth() - primeiraData.getMonth();
      let dias = ultimaData.getDate() - primeiraData.getDate();

      if (dias < 0) {
        meses--;
        const ultimoDiaMesAnterior = new Date(ultimaData.getFullYear(), ultimaData.getMonth(), 0).getDate();
        dias += ultimoDiaMesAnterior;
      }

      if (meses < 0) {
        anos--;
        meses += 12;
      }

      const partes: string[] = [];

      if (anos > 0) {
        partes.push(`${anos} ${anos === 1 ? 'ano' : 'anos'}`);
      }
      if (meses > 0) {
        partes.push(`${meses} ${meses === 1 ? 'mes' : 'meses'}`);
      }
      if (dias > 0) {
        partes.push(`${dias} ${dias === 1 ? 'dia' : 'dias'}`);
      }

      if (partes.length > 0) {
        tempoQueJoga = partes.join(' e ');
      }
    }

    return {
      nomeFormatado: partidasOrdenadas[0].jogador,
      partidasJogadas: totalPartidas,
      mediaPontuacao,
      maiorPontuacao,
      menorPontuacao,
      vezesBateuRecorde,
      tempoQueJoga
    };
  }
}