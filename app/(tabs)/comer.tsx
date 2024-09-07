import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  Tamagotchi,
  useTamagotchiDatabase,
} from "@/database/useTamagotchiDatabase";
import { useGlobalSearchParams } from "expo-router";
import imageUrls from "@/image/imageUrls";
import { Button } from "@rneui/base";
import Bars from "@/components/Bars";

interface ImageSkin {
  skinId: number;
  urlImage: string;
  urlTama: string;
}

type bar = {
  position: number;
  isVisible: boolean;
};

export default function ComerScreen() {
  const [tamagotchi, setTamagotchi] = useState<Tamagotchi>();

  const idParams = useGlobalSearchParams();
  const tamagotchiDatabase = useTamagotchiDatabase();
  const urlsArray: ImageSkin[] = Array.from(imageUrls);

  async function findBydId() {
    await tamagotchiDatabase.calculateAtributes();
    await tamagotchiDatabase.updateCounterStatus(
      Number(idParams.id ? idParams.id : 1)
    );
    const response = await tamagotchiDatabase.findById(
      Number(idParams.id ? idParams.id : 1)
    );

    if (response) {
      console.log(response);
      setTamagotchi(response);
    }
  }

  async function counterHunger() {
    await tamagotchiDatabase.updateCounterHunger(
      Number(idParams.id ? idParams.id : 1)
    );
    findBydId();
  }

  useEffect(() => {
    findBydId();
  }, []);

  if (!tamagotchi) {
    return (
      <SafeAreaView style={styles.safeViewContainer}>
        <View style={styles.container}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  function statusTamagotchi(statusTamagotchi: number) {
    switch (true) {
      case statusTamagotchi < 1:
        return "MORTO";
      case statusTamagotchi < 51:
        return "CRÍTICO";
      case statusTamagotchi < 101:
        return "MUITO TRISTE";
      case statusTamagotchi < 151:
        return "TRISTE";
      case statusTamagotchi < 201:
        return "OK";
      case statusTamagotchi < 251:
        return "BEM";
      case statusTamagotchi < 301:
        return "MUITO BEM";
      default:
        return "STATUS INDEFINIDO";
    }
  }

  const textStyle = (statusTamagotchi: number) => {
    switch (true) {
      case statusTamagotchi < 1:
        return styles.morto;
      case statusTamagotchi < 51:
        return styles.critico;
      case statusTamagotchi < 101:
        return styles.muitoTriste;
      case statusTamagotchi < 151:
        return styles.triste;
      case statusTamagotchi < 201:
        return styles.ok;
      case statusTamagotchi < 251:
        return styles.bem;
      case statusTamagotchi < 301:
        return styles.muitoBem;
      default:
        return styles.indefinido;
    }
  };

  return (
    <SafeAreaView style={styles.safeViewContainer}>
      <ImageBackground
        source={require("@/assets/images/imageBackground.jpg")}
        style={styles.image}
      >
        <View style={styles.container}>
          <View style={styles.stylesNome}>
            <Text style={styles.nomeTamagochi}>{tamagotchi?.nickName}</Text>
          </View>
          <View style={styles.viewStatus}>
            <Text style={textStyle(tamagotchi.counterStatus)}>
              STATUS: {statusTamagotchi(tamagotchi.counterStatus)}
            </Text>
          </View>
        </View>
        <Bars
          counterFun={tamagotchi.counterHunger}
          icon="pizza"
          size={30}
          styles={stylesComponent}
        />
        <View style={styles.center}>
          <Button style={styles.icons} type="clear" onPress={() => {}}>
            <FontAwesome6
              name="burger"
              size={30}
              color="white"
              backgroundColor="#7D3106"
              onPress={() => counterHunger()}
            />
          </Button>
        </View>
        <View style={styles.container}>
          <Image
            style={styles.tamagochi}
            source={(() => {
              const image = urlsArray.find(
                (img) => img.skinId === tamagotchi.imageId
              )?.urlTama;
              if (typeof image === "string") {
                return { uri: image };
              } else if (typeof image === "number") {
                return image;
              }
              return undefined;
            })()}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const stylesComponent = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icons: {
    backgroundColor: "#7D3106",
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    marginLeft: 20,
  },
  bar: {
    marginLeft: 2,
    width: 26,
    height: 30,
    backgroundColor: "#7D3106",
  },
  barLeft: {
    marginLeft: 2,
    width: 26,
    height: 30,
    backgroundColor: "#7D3106",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  barRight: {
    marginLeft: 2,
    width: 26,
    height: 30,
    backgroundColor: "#7D3106",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  barNone: {
    width: 26,
    height: 30,
    backgroundColor: "#7D3106",
    display: "none",
  },
  barLeftNone: {
    width: 26,
    height: 30,
    backgroundColor: "#7D3106",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    display: "none",
  },
  barRightNone: {
    width: 26,
    height: 30,
    backgroundColor: "#7D3106",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    display: "none",
  },
  loadingContainer: {
    width: 290,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FBAC5C",
    padding: 2,
    borderRadius: 20,
    borderColor: "#7D3106",
    borderWidth: 2,
  },
});

const styles = StyleSheet.create({
  safeViewContainer: {
    flex: 1,
    backgroundColor: "#7D3106",
  },
  image: {
    flex: 1,
    width: 400,
    height: 800,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
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
    padding: 6,
  },
  stylesNome: {
    backgroundColor: "rgba(251, 172, 92, 0.8)",
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 10,
  },
  icons: {
    backgroundColor: "#7D3106",
    width: 48,
    height: 48,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  tamagochi: {
    width: 500,
    height: 500,
    marginLeft: 30,
    marginTop: 20,
    resizeMode: "contain",
  },
  loadingText: {
    fontSize: 24,
    color: "#7D3106",
    fontWeight: "bold",
  },
  viewStatus: {
    backgroundColor: "rgba(251, 172, 92, 0.8)",
    borderRadius: 6,
  },
  morto: {
    color: "#7D3106",
    backgroundColor: "rgba(0,0,0,0.8)",
    borderColor: "#7D3106",
    borderBottomWidth: 2,
    fontSize: 24,
    fontWeight: "bold",
  },
  critico: {
    borderRadius: 6,
    color: "#7D3106",
    backgroundColor: "rgba(128,0,0,0.8)",
    borderColor: "#7D3106",
    borderWidth: 2,
    padding: 4,
    fontSize: 24,
    fontWeight: "bold",
  },
  muitoTriste: {
    borderRadius: 6,
    borderColor: "rgba(255,0,0,0.6)",
    borderWidth: 2,
    padding: 4,
    color: "rgba(255,0,0,0.6)",
    fontSize: 24,
  },
  triste: {
    backgroundColor: "rgba(255,165,0,0.8)",
    borderColor: "#7D3106",
    borderWidth: 2,
    borderRadius: 6,
    padding: 4,
    color: "#7D3106",
    fontSize: 24,
  },
  ok: {
    backgroundColor: "rgba(255,255,0,0.8)",
    borderColor: "#7D3106",
    borderWidth: 2,
    borderRadius: 6,
    padding: 4,
    color: "#7D3106",
    fontSize: 24,
  },
  bem: {
    backgroundColor: "rgba(0,255,0,0.8)",
    borderColor: "#7D3106",
    borderWidth: 2,
    borderRadius: 6,
    padding: 4,
    color: "#7D3106",
    fontSize: 24,
  },
  muitoBem: {
    backgroundColor: "rgba(0,128,0,0.8)",
    borderColor: "#7D3106",
    borderWidth: 2,
    borderRadius: 6,
    padding: 4,
    color: "#7D3106",
    fontSize: 24,
  },
  indefinido: {
    backgroundColor: "rgba(0,0,0,0)",
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 2,
    borderRadius: 6,
    padding: 4,
    color: "rgba(0,0,0,0)",
    fontSize: 24,
  },
});
