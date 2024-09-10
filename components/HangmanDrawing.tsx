import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

interface HangmanDrawingProps {
  numerosDeErros: number;
}

const styles = StyleSheet.create({
  head: {
    height: 50,
    width: 50,
    backgroundColor: "#7D3106",
    borderRadius: 50,
    marginLeft: 200,
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
  corpo: {
    height: 70,
    width: 10,
    backgroundColor: "#7D3106",
    marginLeft: 200,
    position: 'absolute',
    top: 80,
    right: 40,
  },
  bracoEsquerdo: {
    height: 10,
    width: 50,
    backgroundColor: "#7D3106",
    marginLeft: 200,
    position: 'absolute',
    top: 95,
    right: 40,
    transform: [{ rotate: '45deg' }],
  },
  bracoDireito: {
    height: 10,
    width: 50,
    backgroundColor: "#7D3106",
    marginLeft: 200,
    position: 'absolute',
    top: 95,
    right: 0,
    transform: [{ rotate: '-45deg' }],
  },
  pernaDireita: {
    height: 10,
    width: 50,
    backgroundColor: "#7D3106",
    marginLeft: 200,
    position: 'absolute',
    top: 158,
    right: 38,
    transform: [{ rotate: '-45deg' }],
  },
  pernaEsquerda: {
    height: 10,
    width: 50,
    backgroundColor: "#7D3106",
    marginLeft: 200,
    position: 'absolute',
    top: 159,
    right: 1,
    transform: [{ rotate: '45deg' }],
  },
  nada: {},
  baseTela: {
    position: 'relative',
  },
  verticalHeadP: {
    height: 50,
    width: 10,
    backgroundColor: '#7D3106',
    marginLeft: 190,
    position: 'absolute',
    top: 0,
    right: 40,
  },
  horizontalLine: {
    width: 140,
    height: 10,
    backgroundColor: '#7D3106',
    position: 'absolute',
    right: 40,
    top: 0,
  },
  vertical: {
    height: 250,
    width: 10,
    backgroundColor: '#7D3106',
    marginLeft: 150,
  },
  baseDoJogo: {
    height: 10,
    width: 250,
    backgroundColor: '#7D3106',
    marginLeft: 80,
  }
});

const HangmanDrawing = ({ numerosDeErros }: HangmanDrawingProps) => {
  const [currentErros, setCurrentErros] = useState<number>(numerosDeErros);

  useEffect(() => {
    setCurrentErros(numerosDeErros);
  }, [numerosDeErros]);

  return (
    <View style={styles.baseTela}>
      {currentErros >= 1 && <View style={styles.head}></View>}
      {currentErros >= 2 && <View style={styles.corpo}></View>}
      {currentErros >= 3 && <View style={styles.bracoEsquerdo}></View>}
      {currentErros >= 4 && <View style={styles.bracoDireito}></View>}
      {currentErros >= 5 && <View style={styles.pernaEsquerda}></View>}
      {currentErros >= 6 && <View style={styles.pernaDireita}></View>}
      
      <View style={styles.verticalHeadP}></View>
      <View style={styles.horizontalLine}></View>
      <View style={styles.vertical}></View>
      <View style={styles.baseDoJogo}></View>
    </View>
  );
};

export default HangmanDrawing;
