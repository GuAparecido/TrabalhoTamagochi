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

export default function SleepScreen() {
  const [barSleep, setBarSleep] = useState<bar[]>([]);
  const [tamagotchi, setTamagotchi] = useState<Tamagotchi>();
  const [isSleeping, setIsSleeping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState(0); // Cronômetro

  const idParams = useGlobalSearchParams();
  const tamagotchiDatabase = useTamagotchiDatabase();
  const urlsArray: ImageSkin[] = Array.from(imageUrls);

  const toggleModal = () => {
    setIsSleeping((prev) => !prev);
    setIsVisible(!isVisible);
    if(tamagotchi)setCountdown(100 - tamagotchi?.counterSleep);
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
    }
  }

  async function updateCounterSleep() {
      await tamagotchiDatabase.updateCounterSleep(Number(idParams.id ? idParams.id : 1));
      findBydId();
  }

  useEffect(() => {
    findBydId();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVisible) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev > 1) {
            updateCounterSleep();
            return prev - 1;
          } else {
            setIsVisible(false); 
            clearInterval(timer);
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isVisible]);

  if (!tamagotchi) {
    return (
      <SafeAreaView style={styles.safeViewContainer}>
        <View style={styles.container}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const backgroundStyle = isSleeping
    ? styles.safeViewContainerDormir
    : styles.safeViewContainer;

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.container}>
        <Text style={styles.nomeTamagochi}>{tamagotchi?.nickName}</Text>
      </View>
      <Bars
        counterFun={tamagotchi.counterSleep}
        icon="moon"
        size={30}
        styles={stylesComponent}
      />
      <View style={styles.center}>
        <Button style={styles.icons} type="clear" onPress={toggleModal}>
          <Ionicons
            name="bed"
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
      <Modal
        transparent={true}
        visible={isVisible}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Dormindo...</Text>
              <Text style={styles.modalText}>
                {countdown}s
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  safeViewContainerDormir: {
    flex: 1,
    backgroundColor: "#A2CCA5",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)", 
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "black",
    borderRadius: 10,
  },
  modalText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
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
