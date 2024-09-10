import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Define o tipo para as props do componente
interface KeyboarddProps {
  onLetterPress: (letter: string) => void;
}

// Alfabeto disponível no teclado
const alfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ç'];

const Keyboardd  = ({ onLetterPress }: KeyboarddProps) => {
  return (
    <View style={styles.baseKeyboard}>
      {
        alfabeto.map((letter) => (
          <TouchableOpacity
            key={letter}
            style={styles.botao}
            onPress={() => onLetterPress(letter)}
          >
            <Text style={styles.letraKeyboard}>{letter}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
    baseKeyboard: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around', // Distribui o espaço entre os itens
      },

      botao:{
        width: 50,
        height: 50,
        backgroundColor: '#7D3106',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 20
      },

      letraKeyboard:{
        textTransform: 'uppercase',
        fontFamily: 'monospace',
        fontSize: 40,
      }
});

export default Keyboardd;
