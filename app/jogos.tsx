import { Button } from "@rneui/base";
import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from "react-native";

const jogos = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ImageBackground
        source={require("@/assets/images/JogoDaVelhaTamagotchi.jpg")}
        style={styles.image}
      >
        <Button
          buttonStyle={styles.jogos}
          onPress={() => router.push("/jogoDaVelha")}
        ></Button>
      </ImageBackground>
      <ImageBackground
        source={require("@/assets/images/imageBackground.jpg")}
        style={styles.image}
      >
        <Button
          buttonStyle={styles.jogos}
          onPress={() => router.push("/register")}
        >
          FORCA
        </Button>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default jogos;

const styles = StyleSheet.create({
  safeContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 850,
    backgroundColor: "rgba(250, 186, 102, 1)",
  },
  jogos: {
    width: 400,
    height: 440,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  image: {},
});
