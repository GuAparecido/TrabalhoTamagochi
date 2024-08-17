import { Image, StyleSheet, Platform, View, Modal, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeViewContainer}>
      <View style={styles.container}>
        <Text style={styles.nomeTamagochi}>Nome do bicho</Text>
        <Text style={styles.tipoTamagochi}>Corinthiano</Text>
      </View>
      <View style={styles.icons}>
        <Ionicons
          name="happy"
          size={40}
          color="white"
          backgroundColor="#7D3106"
        />
      </View>
      <View style={styles.icons}>
        <Ionicons
          name="moon"
          size={40}
          color="white"
          backgroundColor="#7D3106"
        />
      </View>
      <View style={styles.icons}>
        <FontAwesome6
          name="burger"
          size={40}
          color="white"
          backgroundColor="#7D3106"
        />
      </View>
      <View style={styles.container}>
        <Image
          style={styles.tamagochi}
          source={{
            uri: "https://http2.mlstatic.com/D_NQ_NP_698898-MLU74293989152_022024-O.webp",
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeViewContainer: {
    flex: 1,
    backgroundColor: "#A2CCA5",
  },
  container: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  nomeTamagochi: {
    fontSize: 40,
    color: "#7D3106",
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 10,
  },
  tipoTamagochi: {
    fontSize: 18,
    color: "#ffff",
  },
  icons: {
    backgroundColor: "#7D3106",
    width: 60,
    height: 60,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  tamagochi: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginTop: 10,
  },
});
