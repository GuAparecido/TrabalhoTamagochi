import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { router, useGlobalSearchParams } from "expo-router";
import {
  Tamagotchi,
  useTamagotchiDatabase,
} from "@/database/useTamagotchiDatabase";

type Tela = 'menu' | 'jogo' | 'Resultado';
type Jogador = 'X' | 'O' | '' | 'Ninguem';

export default function jogoDaVelha() {

  const idParams = useGlobalSearchParams();
  const tamagotchiDatabase = useTamagotchiDatabase();

  const [tela, setTela] = useState<Tela>('menu');
  const [jogador, setJogador] = useState<Jogador>('');
  const [tabuleiro, setTabuleiro] = useState<Jogador[][]>([["", "", ""], ["", "", ""], ["", "", ""]]);
  const [numeroJogadas, setNumeroJogadas] = useState<number>(0);
  const [vencedor, setVencedor] = useState<Jogador>('');

  function iniciarJogo(jogadorSelecionado: Jogador) {
    setJogador(jogadorSelecionado);
    setNumeroJogadas(9);
    setTabuleiro([["", "", ""], ["", "", ""], ["", "", ""]]);
    setTela('jogo');
  }

  function iniciar(numeroColuna: number, numeroLinha: number) {
    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[numeroLinha][numeroColuna] = jogador;

    setTabuleiro(novoTabuleiro);
    setJogador(jogador === 'X' ? 'O' : 'X');
    verificarVencedor(novoTabuleiro, numeroLinha, numeroColuna);
  }

  function verificarVencedor(tabuleiro: Jogador[][], linha: number, coluna: number) {
    if (tabuleiro[linha][0] === tabuleiro[linha][1] && tabuleiro[linha][1] === tabuleiro[linha][2] && tabuleiro[linha][0] !== '') {
      return finalizarJogo(tabuleiro[linha][0]);
    }

    if (tabuleiro[0][coluna] === tabuleiro[1][coluna] && tabuleiro[1][coluna] === tabuleiro[2][coluna] && tabuleiro[0][coluna] !== '') {
      return finalizarJogo(tabuleiro[0][coluna]);
    }

    if (tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2] && tabuleiro[0][0] !== '') {
      return finalizarJogo(tabuleiro[0][0]);
    }

    if (tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0] && tabuleiro[0][2] !== '') {
      return finalizarJogo(tabuleiro[0][2]);
    }

    if (numeroJogadas - 1 === 0) {
      return finalizarJogo('Ninguem');
    }

    setNumeroJogadas(numeroJogadas - 1);
  }

  async function finalizarJogo(jogadorVencedor: Jogador) {
    setVencedor(jogadorVencedor);
    if(jogadorVencedor != 'Ninguem') {
      await tamagotchiDatabase.updateCounterFun(
        Number(idParams.id)
      );
    }
    setTela('Resultado');
  }

  switch (tela) {
    case 'menu':
      return getTelaMenu();
    case 'jogo':
      return getTelaJogo();
    case 'Resultado':
      return getTelaResultado();
  }

  function getTelaMenu() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>JOGO DA VELHA</Text>
        <Text style={styles.subtitulo}>Selecione o primeiro Jogador</Text>
        <View style={styles.inlineItems}>
          <TouchableOpacity style={styles.boxJogador} onPress={() => iniciarJogo('X')}>
            <Text style={styles.jogardorX}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxJogador} onPress={() => iniciarJogo('O')}>
            <Text style={styles.jogardorO}>O</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function getTelaJogo() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>JOGO DA VELHA</Text>
        {tabuleiro.map((linha, numeroLinha) => (
          <View key={numeroLinha} style={styles.inlineItems}>
            {linha.map((valor, numeroColuna) => (
              <TouchableOpacity
                key={numeroColuna}
                style={styles.boxJogador}
                onPress={() => iniciar(numeroColuna, numeroLinha)}
                disabled={valor !== ''}
              >
                <Text style={valor === 'X' ? styles.jogardorX : styles.jogardorO}>{valor}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <TouchableOpacity style={styles.botaoMenu} onPress={() => setTela('menu')}>
          <Text style={styles.botaoMenuTexto}>Voltar ao menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function getTelaResultado() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>JOGO DA VELHA</Text>
        <Text style={styles.subtitulo}>VENCEDOR</Text>
        <Text style={styles.ganhador}>{vencedor === 'Ninguem' ? 'Nenhum vencedor' : vencedor}</Text>
        <TouchableOpacity style={styles.botaoMenu} onPress={() => setTela('menu')}>
          <Text style={styles.botaoMenuTexto}>Jogar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(250, 186, 102, 1)",
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 30,
    fontWeight: '900',
    color: '#7D3106'
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffff',
    marginTop: 20
  },
  boxJogador: {
    width: 100,
    height: 100,
    backgroundColor: '#7D3106',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 60,
  },
  jogardorX: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'rgba(250, 186, 102, 1)'
  },
  jogardorO: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#ffff'
  },
  inlineItems: {
    flexDirection: 'row'
  },
  botaoMenu: {
    backgroundColor: '#7D3106',
    width: 200,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  botaoMenuTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  ganhador: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#7D3106',
    marginTop: 20
  },
});
