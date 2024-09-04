import { Image, StyleSheet, Platform, View, Modal, Text } from "react-native";
import { Tabs, useGlobalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Tamagotchi, useTamagotchiDatabase } from "@/database/useTamagotchiDatabase";
import imageUrls from "@/image/imageUrls";
import BarFun from "@/components/BarFun";
import BarHunger from "@/components/BarHunger";
import BarSleep from "@/components/BarSleep";

interface ImageSkin {
  skinId: number;
  urlImage: string;
}

type bar = {
  position: number;
  isVisible: boolean;
}

export default function index() {

  const [barFun, setBarFun] = useState<bar[]>([]);
  const [barHunger, setBarHunger] = useState<bar[]>([]);
  const [barSleep, setBarSleep] = useState<bar[]>([]);
  const [tamagotchi, setTamagotchi] = useState<Tamagotchi>();

  const idParams = useGlobalSearchParams();
  const tamagotchiDatabase = useTamagotchiDatabase();
  const urlsArray: ImageSkin[] = Array.from(imageUrls);

  async function findBydId() {
    await tamagotchiDatabase.updateCounterStatus(Number(idParams.id? idParams.id : 1));
    const response = await tamagotchiDatabase.findById(Number(idParams.id? idParams.id : 1));

    if(response) {
      setTamagotchi(response);
      populateBar(response);
    }
  }

  function populateBar(response: Tamagotchi) {
    const fun: bar[] = [];
    const sleep: bar[] = [];
    const hunger: bar[] = [];

    if (response) {
        for (let i = 1; i <= 10; i++) {
            fun.push({ position: i, isVisible: i <= (response.counterFun/10) });
            sleep.push({ position: i, isVisible: i <= (response.counterSleep/10) });
            hunger.push({ position: i, isVisible: i <= (response.counterHunger/10)});
        }
        
        setBarFun(fun);
        setBarSleep(sleep);
        setBarHunger(hunger);
    }
}
  useEffect(() => {
    findBydId();
  }, []);

  return (
    <SafeAreaView style={styles.safeViewContainer}>
      <View style={styles.container}>
        <Text style={styles.nomeTamagochi}>{tamagotchi?.nickName}</Text>
      </View>
      {/* BAR FUN */}
      <BarFun />
      {/* <View style={styles.row}>
        <View style={styles.icons}>
          <Ionicons
            name="happy"
            size={40}
            color="white"
            backgroundColor="#7D3106"
          />
        </View>
        <View style={styles.loadingContainer}>
          {barFun.map((fun) => (
            <View
              key={fun.position}
              style={getBarStyle(fun)}
            />
          ))}
        </View>
      </View> */}

      {/* BAR SLEEP */}
      <BarSleep/>
      {/* <View style={styles.row}>
        <View style={styles.icons}>
          <Ionicons
            name="moon"
            size={40}
            color="white"
            backgroundColor="#7D3106"
          />
        </View>
        <View style={styles.loadingContainer}>
        {barSleep.map((sleep) => (
            <View
              key={sleep.position}
              style={getBarStyle(sleep)}
            />
          ))}
        </View>
      </View> */}

      {/* BAR HUNGER */}
      <BarHunger />
      {/* <View style={styles.row}>
        <View style={styles.icons}>
          <FontAwesome6
            name="burger"
            size={40}
            color="white"
            backgroundColor="#7D3106"
          />
        </View>
        <View style={styles.loadingContainer}>
        {barHunger.map((hunger) => (
            <View
              key={hunger.position}
              style={getBarStyle(hunger)}
            />
          ))}
        </View>
      </View> */}
      <View style={styles.container}>
        <Image
          style={styles.tamagochi}
          source={{
            uri:  urlsArray.find(image => image.skinId === tamagotchi?.imageId)?.urlImage,
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
    marginTop: 30,
  },
});
