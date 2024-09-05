import { Image, StyleSheet, Platform, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tamagotchi, useTamagotchiDatabase } from "@/database/useTamagotchiDatabase";
import { router, useGlobalSearchParams } from "expo-router";
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

export default function GamesScreen() {
  const [tamagotchi, setTamagotchi] = useState<Tamagotchi>();

  const idParams = useGlobalSearchParams();
  const tamagotchiDatabase = useTamagotchiDatabase();
  const urlsArray: ImageSkin[] = Array.from(imageUrls);

  async function findBydId() {
    await tamagotchiDatabase.updateCounterStatus(
      Number(idParams.id ? idParams.id : 1)
    );
    const response = await tamagotchiDatabase.findById(
      Number(idParams.id ? idParams.id : 1)
    );

    if (response) {
      setTamagotchi(response);
    }
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

  return (
    <SafeAreaView style={styles.safeViewContainer}>
      <View style={styles.container}>
        <Text style={styles.nomeTamagochi}>{tamagotchi?.nickName}</Text>
      </View>
      <Bars
        counterFun={tamagotchi.counterFun}
        icon="happy"
        size={30}
        styles={stylesComponent}
      />
      <View style={styles.center}>
        <Button
          style={styles.icons}
          type="clear"
          onPress={() => router.push("/jogos")}
        >
          <Ionicons
            name="dice"
            size={30}
            color="white"
            backgroundColor="#7D3106"
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
    backgroundColor: "#A2CCA5",
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
    marginTop: 10,
    marginLeft: 12,
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
});
