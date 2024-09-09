import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState, useEffect } from "react";
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
  urlImage: any;
  urlTama: any;
}

export default function SleepScreen() {
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
    if(tamagotchi)setCountdown(101 - tamagotchi?.counterSleep);
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
    await tamagotchiDatabase.updateCounterSleep(
      Number(idParams.id ? idParams.id : 1)
    );
    findBydId();
  }

  useFocusEffect(
    useCallback(() => {
      findBydId();
    }, [])
  );

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

  const backgroundStyle = isSleeping
    ? styles.safeViewContainerDormir
    : styles.safeViewContainer;


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
    <ImageBackground
      source={require("@/assets/images/imageBackground.jpg")}
      style={styles.image}
    >
      <SafeAreaView style={styles.safeViewContainer}>
        <View style={styles.center}>
          <Bars
            counterFun={tamagotchi.counterSleep}
            icon="moon"
            size={18}
            styles={stylesComponent}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.viewStatus}>
            <Text style={textStyle(tamagotchi.counterStatus)}>
              STATUS: {statusTamagotchi(tamagotchi.counterStatus)}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <Image
            style={styles.tamagochi}
            source={urlsArray[tamagotchi.imageId-1].urlTama}
          />
        </View>
        <View style={[styles.stylesNome, stylesComponent.row]}>
          <Text style={styles.nomeTamagochi}>{tamagotchi?.nickName}</Text>
          <Button style={styles.icons} type="clear" onPress={toggleModal}>
            <Ionicons
              name="bed"
              size={30}
              color="white"
              backgroundColor="#7D3106"
            />
          </Button>
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
                <Text style={styles.modalText}>{countdown}s</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
}

const stylesComponent = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icons: {
    backgroundColor: "#7D3106",
    width: 26,
    height: 26,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 6,
    marginLeft: -42,
  },
  bar: {
    marginLeft: 2,
    width: 18,
    height: 18,
    backgroundColor: "#7D3106",
  },
  barLeft: {
    marginLeft: 2,
    width: 18,
    height: 18,
    backgroundColor: "#7D3106",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  barRight: {
    marginLeft: 2,
    width: 18,
    height: 18,
    backgroundColor: "#7D3106",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  barNone: {
    width: 18,
    height: 18,
    backgroundColor: "#7D3106",
    display: "none",
  },
  barLeftNone: {
    width: 18,
    height: 18,
    backgroundColor: "#7D3106",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    display: "none",
  },
  barRightNone: {
    width: 18,
    height: 18,
    backgroundColor: "#7D3106",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    display: "none",
  },
  loadingContainer: {
    width: 210,
    height: 26,
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
  },
  image: {
    flex: 1,
    width: 400,
    height: 800,
    padding: 12,
  },
  safeViewContainerDormir: {
    flex: 1,
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
    fontSize: 34,
    color: "rgba(251, 172, 92, 1)",
    fontWeight: "bold",
  },
  stylesNome: {
    alignItems: "center",
    justifyContent: "center",
  },
  icons: {
    backgroundColor: "#7D3106",
    width: 48,
    height: 48,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    position: "static",
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
    color: "rgba(0,0,0,0.8)",
    borderColor: "rgba(0,0,0,0.8)",
    borderBottomWidth: 2,
    fontSize: 16,
    fontWeight: "bold",
  },
  critico: {
    borderRadius: 6,
    color: "rgba(128,0,0,0.8)",
    borderColor: "rgba(128,0,0,0.8)",
    borderWidth: 2,
    padding: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  muitoTriste: {
    borderRadius: 6,
    borderColor: "rgba(255,0,0,0.6)",
    borderWidth: 2,
    padding: 4,
    color: "rgba(255,0,0,0.6)",
    fontSize: 16,
  },
  triste: {
    borderColor: "rgba(120,120,120,1)",
    borderWidth: 2,
    borderRadius: 6,
    padding: 4,
    color: "rgba(120,120,120,1)",
    fontSize: 16,
  },
  ok: {
    borderColor: "rgba(250,250,250,1)",
    borderWidth: 2,
    borderRadius: 6,
    padding: 4,
    color: "rgba(250,250,250,1)",
    fontSize: 16,
  },
  bem: {
    borderColor: "rgba(0,255,0,0.8)",
    borderWidth: 2,
    borderRadius: 6,
    padding: 4,
    color: "rgba(0,255,0,0.8)",
    fontSize: 16,
  },
  muitoBem: {
    borderColor: "rgba(0,128,0,0.8)",
    borderWidth: 2,
    borderRadius: 6,
    padding: 4,
    color: "rgba(0,128,0,0.8)",
    fontSize: 16,
  },
  indefinido: {
    backgroundColor: "rgba(0,0,0,0)",
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 2,
    borderRadius: 6,
    padding: 4,
    color: "rgba(0,0,0,0)",
    fontSize: 16,
  },
});
