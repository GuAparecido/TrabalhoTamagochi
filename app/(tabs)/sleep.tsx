import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Tamagotchi,
  useTamagotchiDatabase,
} from "@/database/useTamagotchiDatabase";
import { useGlobalSearchParams } from "expo-router";
import imageUrls from "@/image/imageUrls";
import { Button } from "@rneui/base";
import BarSleep from "@/components/BarSleep";
interface ImageSkin {
  skinId: number;
  urlImage: string;
}

type bar = {
  position: number;
  isVisible: boolean;
};

export default function SleepScreen() {
  const [barSleep, setBarSleep] = useState<bar[]>([]);
  const [tamagotchi, setTamagotchi] = useState<Tamagotchi>();
  const [isSleeping, setIsSleeping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const idParams = useGlobalSearchParams();
  const tamagotchiDatabase = useTamagotchiDatabase();
  const urlsArray: ImageSkin[] = Array.from(imageUrls);

  const toggleModal = () => {
    setIsSleeping((prev) => !prev);
    setIsVisible(!isVisible);
  };

  async function findBydId() {
    await tamagotchiDatabase.updateCounterStatus(
      Number(idParams.id ? idParams.id : 1)
    );
    const response = await tamagotchiDatabase.findById(
      Number(idParams.id ? idParams.id : 1)
    );

    if (response) {
      setTamagotchi(response);
      populateBar(response);
    }
  }

  function populateBar(response: Tamagotchi) {
    const sleep: bar[] = [];

    if (response) {
      for (let i = 1; i <= 10; i++) {
        sleep.push({ position: i, isVisible: i <= response.counterSleep / 10 });
      }

      setBarSleep(sleep);
    }
  }

  useEffect(() => {
    findBydId();
  }, []);

  const backgroundStyle = isSleeping
    ? styles.safeViewContainerDormir
    : styles.safeViewContainer;

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.container}>
        <Text style={styles.nomeTamagochi}>{tamagotchi?.nickName}</Text>
      </View>
      <BarSleep />
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
            <View key={sleep.position} style={getBarStyle(sleep)} />
          ))}
        </View>
      </View> */}
      <View style={styles.container}>
        <Image
          style={styles.tamagochi}
          source={{
            uri: urlsArray.find((image) => image.skinId === tamagotchi?.imageId)
              ?.urlImage,
          }}
        />
      </View>
      <View style={styles.center}>
        <Button style={styles.icons} type="clear" onPress={toggleModal}>
          <Ionicons
            name="bed"
            size={40}
            color="white"
            backgroundColor="#7D3106"
          />
        </Button>
        <Modal
          transparent={true}
          visible={isVisible}
          animationType="fade"
          onRequestClose={toggleModal}
        >
          <TouchableWithoutFeedback onPress={toggleModal}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}></View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
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
    backgroundColor: "#A2CCA5",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)", // Sombra preta transparente
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "black",
    borderRadius: 10,
    display: "none",
  },
  text: {
    textAlign: "center",
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
});
