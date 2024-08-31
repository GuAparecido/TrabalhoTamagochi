import { Image, StyleSheet, Platform, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tamagotchi, useTamagotchiDatabase } from "@/database/useTamagotchiDatabase";
import { useGlobalSearchParams } from "expo-router";
import imageUrls from "@/image/imageUrls";
import { Button } from "@rneui/base";
interface ImageSkin {
  skinId: number;
  urlImage: string;
}


export default function SleepScreen() {
  const [progress, setProgress] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [tamagotchi, setTamagotchi] = useState<Tamagotchi>();
  const [isSleeping, setIsSleeping] = useState(false);

  const idParams = useGlobalSearchParams();
  const tamagotchiDatabase = useTamagotchiDatabase();
  const urlsArray: ImageSkin[] = Array.from(imageUrls);

  async function findBydId() {
    const response = await tamagotchiDatabase.findById(Number(idParams.id));

    if (response) {
      setTamagotchi(response);
    }
  }

  useEffect(() => {
    findBydId();
  }, []);

  const backgroundStyle = isSleeping ? styles.safeViewContainerDormir : styles.safeViewContainer;

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.container}>
        <Text style={styles.nomeTamagochi}>{tamagotchi?.nickName}</Text>
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
                  : index === 9
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
            uri: urlsArray.find(image => image.skinId === tamagotchi?.imageId)?.urlImage,
          }}
        />
      </View>
      <View style={styles.center}>
        <Button style={styles.icons} type="clear" onPress={() => setIsSleeping(prev => !prev)}>
          <Ionicons
            name="bed"
            size={40}
            color="white"
            backgroundColor="#7D3106"
          />
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeViewContainer: {
    flex: 1,
    backgroundColor: "#A2CCA5",
  },
  safeViewContainerDormir: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 50,
    marginBottom: 50,
    
  },
  bar: {
    width: 26,
    height: 32,
    margin: 0,
    padding: 0,
    backgroundColor: "#7D3106",
  },
  barLeft: {
    width: 26,
    height: 32,
    borderRadius: 2,
    margin: 0,
    padding: 0,
    backgroundColor: "#7D3106",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  barRight: {
    width: 26,
    height: 32,
    borderRadius: 2,
    margin: 0,
    padding: 0,
    backgroundColor: "#7D3106",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  loadingContainer: {
    width: 300,
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
