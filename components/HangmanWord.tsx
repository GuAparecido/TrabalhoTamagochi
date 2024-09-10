import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface HangmanWordProps {
  palavra: string;
  guessedLetters: string[];
}

const HangmanWord = ({ palavra, guessedLetters }: HangmanWordProps) => {
  const [currentWord, setCurrentWord] = useState<string>(palavra);

  useEffect(() => {
    setCurrentWord(palavra);
  }, [palavra]);

  return (
    <View style={[styles.baseTelaPontilhado, { flexWrap: 'wrap' }]}>
      {currentWord.split('').map((letra, index) => {
        const letraAdivinhada = guessedLetters.includes(letra);
        return (
          <Text key={index} style={styles.palavra}>
            {letraAdivinhada ? letra : ' '}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  baseTelaPontilhado: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    margin: 10,
    textTransform: 'uppercase',
    fontFamily: 'monospace',
  },
  palavra: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 20,
    marginHorizontal: 5,
    borderBottomWidth: 5, 
    borderBottomColor: '#7D3106', 
    color: '#7D3106',
    borderStyle: 'solid',
    height: 50,
    minWidth: 20,
  }
});

export default HangmanWord;
