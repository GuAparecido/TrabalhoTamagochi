import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import HangmanDrawing from "@/components/HangmanDrawing";
import HangmanWord from "@/components/HangmanWord";
import SpeechButton from "@/components/SpeechButton";
import { Button, ButtonGroup } from "@rneui/base";
import {
  Tamagotchi,
  useTamagotchiDatabase,
} from "@/database/useTamagotchiDatabase";
import { router, useGlobalSearchParams } from "expo-router";

const palavrasAleatorias = [
  "abacaxi", "banana", "computador", "elefante", "floresta",
  "girassol", "hamburguer", "internet", "kiwi"
];

export default function App() {

  const idParams = useGlobalSearchParams();
  const tamagotchiDatabase = useTamagotchiDatabase();

  const [pAleatorias, setPAleatorias] = useState(() => palavrasAleatorias[Math.floor(Math.random() * palavrasAleatorias.length)]);
  const [letrasCorretas, setLetrasCorretas] = useState<string[]>([]);
  const [letrasErradas, setLetrasErradas] = useState<string[]>([]);
  const [ganhou, setGanhou] = useState(false);
  const [perdeu, setPerdeu] = useState(false);

  const handleSpeechResults = async (text: string) => {
    const guessedWord = text.trim().toLowerCase();

    if (pAleatorias === guessedWord) {
      setGanhou(true); 
      await tamagotchiDatabase.updateCounterFun(
        Number(idParams.id)
      );
    } else {
      setLetrasCorretas((prev) => [...new Set([...prev, ...guessedWord])]);
        setPerdeu(letrasErradas.length + 1 >= 6); // Atualiza o estado de derrota se exceder 6 erros
        setLetrasErradas((prev) => [...prev, guessedWord]); // Adiciona a palavra errada
    }
  };

  const handleRestart = () => {
    setLetrasCorretas([]);
    setLetrasErradas([]);
    setGanhou(false);
    setPerdeu(false);
    setPAleatorias(palavrasAleatorias[Math.floor(Math.random() * palavrasAleatorias.length)]);
  };

  return (
    <View style={[styles.container, styles.center]}>
      <StatusBar style="auto" />
      {perdeu || ganhou ? (
        <View style={styles.container}>
          <Text style={styles.titulo}>{perdeu ? "Você perdeu!" : "Você ganhou!"}</Text>
          <Button buttonStyle={styles.button} title="Jogar novamente" onPress={handleRestart} />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.center}>
            <Text style={styles.titulo}>ACERTE O TIME</Text>
          </View>
          <Text style={styles.palavrasErradas}>{letrasErradas.join(", ")}</Text>
          <HangmanDrawing numerosDeErros={letrasErradas.length} />
          <HangmanWord palavra={pAleatorias} guessedLetters={letrasCorretas} />
          <View style={styles.mic}>
          <SpeechButton onSpeechResults={handleSpeechResults} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 52,
    backgroundColor: "rgba(250, 186, 102, 1)"
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#7D3106",
  },
  mic: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  palavrasErradas: {
    fontSize: 18,
    marginBottom: 20,
    color: "#7D3106",
  },
  button: {
    backgroundColor: "#7D3106"
  }
});
