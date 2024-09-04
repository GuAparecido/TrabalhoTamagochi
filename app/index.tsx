import { useRouter } from "expo-router";
import { Image, View, StyleSheet, Text, ScrollView } from "react-native";
import imageUrls from "@/image/imageUrls";
import { Input, Button } from "@rneui/themed";
import {
  Tamagotchi,
  useTamagotchiDatabase,
} from "@/database/useTamagotchiDatabase";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import BarFun from "@/components/BarFun";
import BarSleep from "@/components/BarSleep";
import BarHunger from "@/components/BarHunger";

interface ImageSkin {
  skinId: number;
  urlImage: string;
}

const Index = () => {
  const [search, setSearch] = useState<string>("");
  const [tamagotchis, setTamagotchis] = useState<Tamagotchi[]>([]);

  const tamagotchiDatabase = useTamagotchiDatabase();
  const router = useRouter();
  const urlsArray: ImageSkin[] = Array.from(imageUrls);

  async function findTamagochis() {
    try {
      if (search.trim() === "") {
        const response = await tamagotchiDatabase.findAll();
        setTamagotchis(response);
      } else {
        const response = await tamagotchiDatabase.findBySearch(search);
        setTamagotchis(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function statusTamagotchi(statusTamagotchi: number) {
    switch (true) {
      case statusTamagotchi < 1:
        return "MORTÃO";
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
        return styles.mortao;
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

  useFocusEffect(
    useCallback(() => {
      findTamagochis();
    }, [search])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Input
        placeholder="Busque seu Tamagochi"
        placeholderTextColor="#7D0631"
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        onChangeText={setSearch}
      />

      <Button
        size="md"
        color="#7D0631"
        buttonStyle={styles.registerButton}
        onPress={() => router.push("/register")}
        style={{ width: 200 }}
      >
        Novo
      </Button>

      <View style={styles.grid}>
        {tamagotchis.map((tamagotchi) => (
          <Button
            key={tamagotchi.id}
            buttonStyle={styles.button}
            // onPress={() => router.push(`/home ${tamagotchi.id}`)} // Atentar ao banco que puxará o id do Tamagochi e trará relacionado ao tamagochi
            title={
              <View style={styles.buttonContent}>
                <Image
                  source={{
                    uri: urlsArray.find(
                      (image) => image.skinId === tamagotchi.imageId
                    )?.urlImage,
                  }}
                  style={styles.image}
                />
                <View style={styles.divider} />
                <Text style={styles.buttonText}>{tamagotchi.nickName}</Text>
                <Text style={textStyle(tamagotchi.counterStatus)}>
                  {statusTamagotchi(tamagotchi.counterStatus)}
                </Text>
                <View style = {styles.bars}>
                  <BarFun />
                  <BarSleep/>
                  <BarHunger/>
                </View>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#FABA66",
    paddingTop: 20,
    paddingBottom: 20,
  },
  bars: {
    height: 120,
    width: 120,
    margin: 0,
    padding: 0,
    alignItems: 'center'
  },
  registerbutton: {
    width: 200,
    marginTop: 30,
  },
  input: {
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
    gap: 10,
  },
  button: {
    borderRadius: 50,
    borderColor: "#7D0631",
    borderWidth: 2,
    backgroundColor: "rgba(125, 6, 49, 0.3)",
    width: 300,
    height: 600,
  },
  buttonContainer: {
    width: 150,
    height: 150,
  },
  selectedButtonContainer: {
    borderRadius: 50,
    borderWidth: 2,
    backgroundColor: "#7D0631",
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
    borderBottomWidth: 1,
    borderBottomColor: "#7D0631",
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  registerButton: {
    width: 100,
    marginTop: 30,
  },
  mortao: {
    color: "red",
    fontSize: 24,
    fontWeight: "bold",
  },
  critico: {
    color: "darkred",
    fontSize: 22,
    fontWeight: "bold",
  },
  muitoTriste: {
    color: "orange",
    fontSize: 20,
  },
  triste: {
    color: "gold",
    fontSize: 18,
  },
  ok: {
    color: "green",
    fontSize: 16,
  },
  bem: {
    color: "blue",
    fontSize: 14,
  },
  muitoBem: {
    color: "purple",
    fontSize: 12,
  },
  indefinido: {
    color: "black",
    fontSize: 10,
  },
});

export default Index;
