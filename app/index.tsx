import { useRouter } from "expo-router";
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import imageUrls from "@/image/imageUrls";
import { Input, Button } from "@rneui/themed";
import {
  Tamagotchi,
  useTamagotchiDatabase,
} from "@/database/useTamagotchiDatabase";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import Bars from "@/components/Bars";
import { SafeAreaView } from "react-native-safe-area-context";

interface ImageSkin {
  skinId: number;
  urlImage: any;
}

const Index = () => {
  const [search, setSearch] = useState<string>("");
  const [tamagotchis, setTamagotchis] = useState<Tamagotchi[]>([]);

  const tamagotchiDatabase = useTamagotchiDatabase();
  const router = useRouter();
  const urlsArray: ImageSkin[] = Array.from(imageUrls);

  async function findTamagochis() {
    await tamagotchiDatabase.calculateAtributes();
    await tamagotchiDatabase.updateAllCounterStatus();
    try {
      if (search.trim() === "") {
        const response = await tamagotchiDatabase.findAll();
        setTamagotchis(response);
      } else {
        const response = await tamagotchiDatabase.findBySearch(search);
        setTamagotchis(response);
      }
    } catch (error) {
      throw error;
    }
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

  const dead = (statusDead: number): boolean => {
    return statusDead === 0 ? true : false;
  };

  useFocusEffect(
    useCallback(() => {
      findTamagochis();
    }, [search])
  );

  if (!tamagotchis) {
    return (
      <SafeAreaView>
        <View >
          <Text> Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Input
        placeholder="Busque seu Tamagochi"
        placeholderTextColor="#7D0631"
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        onChangeText={setSearch}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.grid}>
          {tamagotchis.map((tamagotchi) => (
            <Button
              disabled={dead(tamagotchi.counterStatus)}
              key={tamagotchi.id}
              buttonStyle={
                tamagotchi.counterStatus === 0
                  ? styles.buttonDead
                  : styles.button
              }
              title={
                <View style={styles.buttonContent}>
                  <Image
                    source={urlsArray[tamagotchi.imageId-1].urlImage}
                    style={styles.image}
                  />
                  <View style={styles.divider} />
                  <Text style={styles.buttonText}>{tamagotchi.nickName}</Text>
                  <Bars
                    counterFun={tamagotchi.counterFun}
                    icon="happy"
                    size={14}
                    styles={
                      tamagotchi.counterStatus === 0
                        ? stylesBarDead
                        : stylesComponent
                    }
                  />
                  {/* BAR HUNGER */}
                  <Bars
                    counterFun={tamagotchi.counterHunger}
                    icon="pizza"
                    size={14}
                    styles={
                      tamagotchi.counterStatus === 0
                        ? stylesBarDead
                        : stylesComponent
                    }
                  />
                  {/* BAR SLEEP */}
                  <Bars
                    counterFun={tamagotchi.counterSleep}
                    icon="moon"
                    size={14}
                    styles={
                      tamagotchi.counterStatus === 0
                        ? stylesBarDead
                        : stylesComponent
                    }
                  />
                  <Text style={textStyle(tamagotchi.counterStatus)}>
                    STATUS: {statusTamagotchi(tamagotchi.counterStatus)}
                  </Text>
                </View>
              }
              type="clear"
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/",
                  params: { id: tamagotchi.id },
                })
              }
            />
          ))}
        </View>
      </ScrollView>
      <Button
        buttonStyle={styles.registerButton}
        onPress={() => router.push("/register")}
      >Novo</Button>
    </SafeAreaView>
  );
};

const stylesComponent = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icons: {
    backgroundColor: "#7D3106",
    width: 20,
    height: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
  },
  bar: {
    marginLeft: 2,
    width: 7,
    height: 14,
    backgroundColor: "#7D3106",
  },
  barLeft: {
    marginLeft: 2,
    width: 8,
    height: 14,
    backgroundColor: "#7D3106",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  barRight: {
    marginLeft: 2,
    width: 8,
    height: 14,
    backgroundColor: "#7D3106",
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  barNone: {
    width: 7,
    height: 14,
    backgroundColor: "#7D3106",
    display: "none",
  },
  barLeftNone: {
    width: 7,
    height: 14,
    backgroundColor: "#7D3106",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    display: "none",
  },
  barRightNone: {
    width: 7,
    height: 14,
    backgroundColor: "#7D3106",
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    display: "none",
  },
  loadingContainer: {
    width: 100,
    height: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(250, 186, 102, 1)",
    padding: 1,
    borderRadius: 16,
    borderColor: "#7D3106",
    borderWidth: 2,
  },
});

const stylesBarDead = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icons: {
    backgroundColor: "black",
    width: 20,
    height: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
  },
  bar: {
    marginLeft: 2,
    width: 7,
    height: 14,
    backgroundColor: "rgba(150, 150, 150, 0.8)",
  },
  barLeft: {
    marginLeft: 2,
    width: 8,
    height: 14,
    backgroundColor: "rgba(150, 150, 150, 0.8)",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  barRight: {
    marginLeft: 2,
    width: 8,
    height: 14,
    backgroundColor: "rgba(150, 150, 150, 0.8)",
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  barNone: {
    width: 7,
    height: 14,
    backgroundColor: "rgba(150, 150, 150, 0.8)",
    display: "none",
  },
  barLeftNone: {
    width: 7,
    height: 14,
    backgroundColor: "rgba(150, 150, 150, 0.8)",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    display: "none",
  },
  barRightNone: {
    width: 7,
    height: 14,
    backgroundColor: "rgba(150, 150, 150, 0.8)",
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    display: "none",
  },
  loadingContainer: {
    width: 100,
    height: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(150, 150, 150, 0.8)",
    padding: 1,
    borderRadius: 16,
    borderColor: "black",
    borderWidth: 2,
  },
});

const styles = StyleSheet.create({
  safeContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 805,
    backgroundColor: "rgba(250, 186, 102, 1)",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "rgba(250, 186, 102, 1)",
  },
  input: {
    marginTop: 10,
    color: "#7D0631",
  },
  inputContainer: {
    borderBottomColor: "#7D0631",
    borderBottomWidth: 2,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 30,
  },
  button: {
    borderRadius: 20,
    borderColor: "#7D0631",
    borderWidth: 2,
    backgroundColor: "rgba(125, 6, 49, 0.4)",
    width: 150,
    height: 300,
  },
  buttonDead: {
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "rgba(150, 150, 150, 0.8)",
    width: 150,
    height: 300,
  },
  image: {
    width: 80,
    height: 80,
  },
  buttonContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    width: "80%",
    marginVertical: 8,
  },
  buttonText: {
    paddingBottom: 12,
    fontSize: 18,
    color: "#fff",
  },
  registerButton: {
    width: 100,
    borderRadius: 12,
    backgroundColor: "rgba(125, 6, 49, 0.4)",
    borderColor: "#7D0631",
    borderWidth: 2,
    marginBottom: 20,
    marginTop: 20,
  },
  morto: {
    color: "rgba(0,0,0,0.8)",
    fontSize: 14,
    fontWeight: "bold",
  },
  critico: {
    paddingTop: 12,
    color: "rgba(128,0,0,0.8)",
    fontSize: 14,
    fontWeight: "bold",
  },
  muitoTriste: {
    paddingTop: 12,
    color: "rgba(255,0,0,0.6)",
    fontSize: 14,
  },
  triste: {
    paddingTop: 12,
    color: "rgba(120,120,120,1)",
    fontSize: 14,
  },
  ok: {
    paddingTop: 12,
    color: "rgba(250,250,250,1)",
    fontSize: 14,
  },
  bem: {
    paddingTop: 12,
    color: "rgba(0,255,0,0.8)",
    fontSize: 14,
  },
  muitoBem: {
    paddingTop: 12,
    color: "rgba(0,128,0,0.8)",
    fontSize: 14,
  },
  indefinido: {
    paddingTop: 12,
    color: "rgba(0,0,0,0)",
    fontSize: 14,
  },
});

export default Index;
