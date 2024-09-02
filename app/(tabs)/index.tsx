import { Image, StyleSheet, Platform, View, Modal, Text } from "react-native";
import { Tabs, useGlobalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Tamagotchi, useTamagotchiDatabase } from "@/database/useTamagotchiDatabase";
import imageUrls from "@/image/imageUrls";
interface ImageSkin {
  skinId: number;
  urlImage: string;
}

type bar = {
  position: number;
  isVisible: boolean;
}

export default function index() {

  const [progress, setProgress] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [barFun, setBarFun] = useState<bar[]>([]);
  const [barHunger, setBarHunger] = useState<bar[]>([]);
  const [barSleep, setBarSleep] = useState<bar[]>([]);
  const [tamagotchi, setTamagotchi] = useState<Tamagotchi>();

  const idParams = useGlobalSearchParams();
  const tamagotchiDatabase = useTamagotchiDatabase();
  const urlsArray: ImageSkin[] = Array.from(imageUrls);

  async function findBydId() {
    const response = await tamagotchiDatabase.findById(Number(idParams.id? idParams.id : 1));

    if(response) {
      const bars: bar[] = [];
      setTamagotchi(response);
      console.log(tamagotchi);
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


  function getBarStyle (fun: bar) {
    if (fun.isVisible) {
      if (fun.position === 1) {
        return styles.barLeft;
      } else if (fun.position === 10) {
        return styles.barRight;
      } else {
        return styles.bar;
      }
    } else {
      if (fun.position === 1) {
        return styles.barLeftNone;
      } else if (fun.position === 10) {
        return styles.barRightNone;
      } else {
        return styles.barNone;
      }
    }
  }

  useEffect(() => {
    findBydId();
  }, [])

  return (
    <SafeAreaView style={styles.safeViewContainer}>
      <View style={styles.container}>
        <Text style={styles.nomeTamagochi}>{tamagotchi?.nickName}</Text>
      </View>

      {/* BAR FUN */}
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
          {barFun.map((fun) => (
            <View
              key={fun.position}
              style={getBarStyle(fun)}
            />
          ))}
        </View>
      </View>

      {/* BAR SLEEP */}
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
        {barSleep.map((sleep) => (
            <View
              key={sleep.position}
              style={getBarStyle(sleep)}
            />
          ))}
        </View>
      </View>

      {/* BAR HUNGER */}
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
        {barHunger.map((hunger) => (
            <View
              key={hunger.position}
              style={getBarStyle(hunger)}
            />
          ))}
        </View>
      </View>
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
  bar: {
    marginLeft: 2,
    width: 26,
    height: 30,
    margin: 0,
    padding: 0,
    backgroundColor: "#7D3106",
  },
  barLeft: {
    marginLeft: 2,
    width: 26,
    height: 30,
    borderRadius: 2,
    margin: 0,
    padding: 0,
    backgroundColor: "#7D3106",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20
  },
  barRight: {
    marginLeft: 2,
    width: 26,
    height: 30,
    borderRadius: 2,
    margin: 0,
    padding: 0,
    backgroundColor: "#7D3106",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  barNone: {
    width: 26,
    height: 32,
    margin: 0,
    padding: 0,
    backgroundColor: "#7D3106",
    display: "none"
  },
  barLeftNone: {
    width: 26,
    height: 32,
    borderRadius: 2,
    margin: 0,
    padding: 0,
    backgroundColor: "#7D3106",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    display: "none",
  },
  barRightNone: {
    width: 26,
    height: 32,
    borderRadius: 2,
    margin: 0,
    padding: 0,
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
