import { Image, StyleSheet, Platform, View, Modal, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function HomeScreen() {
  const [progress, setProgress] = useState([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = [...prev];
        const firstZeroIndex = newProgress.indexOf(0);
        if (firstZeroIndex !== -1) {
          newProgress[firstZeroIndex] = 1;
        } else {
          clearInterval(interval);
        }
        return newProgress;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.safeViewContainer}>
      <View style={styles.container}>
        <Text style={styles.nomeTamagochi}>Nome do bicho</Text>
        <Text style={styles.tipoTamagochi}>Corinthiano</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.icons}>
          <Ionicons
            name="happy"
            size={40}
            color="white"
            backgroundColor="#7D3106"
          />
        </View>
        <View style={styles.loadingContainer}>
          {progress.map((fill, index) => (
            <View
              key={index}
              style={
                index === 0
                  ? styles.barLeft
                  : index === 5
                  ? styles.barRight
                  : styles.bar
              }
            />
          ))}
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.icons}>
          <Ionicons
            name="moon"
            size={40}
            color="white"
            backgroundColor="#7D3106"
          />
        </View>
        <View style={styles.loadingContainer}>
          {progress.map((fill, index) => (
            <View
              key={index}
              style={
                index === 0
                  ? styles.barLeft
                  : index === 5
                  ? styles.barRight
                  : styles.bar
              }
            />
          ))}
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.icons}>
          <FontAwesome6
            name="burger"
            size={40}
            color="white"
            backgroundColor="#7D3106"
          />
        </View>
        <View style={styles.loadingContainer}>
          {progress.map((fill, index) => (
            <View
              key={index}
              style={
                index === 0
                  ? styles.barLeft
                  : index === 5
                  ? styles.barRight
                  : styles.bar
              }
            />
          ))}
        </View>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
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
  bar: {
    width: 30,
    height: 32,
    margin: 0,
    padding: 0,
    backgroundColor: "#7D3106",
  },
  barLeft: {
    width: 30,
    height: 32,
    borderRadius: 2,
    margin: 0,
    padding: 0,
    backgroundColor: "#7D3106",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  barRight: {
    width: 30,
    height: 32,
    borderRadius: 2,
    margin: 0,
    padding: 0,
    backgroundColor: "#7D3106",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  loadingContainer: {
    width: 200,
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FBAC5C",
    padding: 2,
    borderRadius: 20,
    borderColor: "#7D3106",
    borderWidth: 2,
  },
});
