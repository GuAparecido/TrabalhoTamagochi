import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useState } from "react";
import imageUrls, { ImageSkin } from "@/image/imageUrls";
import { useTamagotchiDatabase } from "@/database/useTamagotchiDatabase";
import { useRouter } from "expo-router";

const Register = () => {
  const [nickName, setNickName] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const urlsArray: ImageSkin[] = Array.from(imageUrls);
  const tamagotchiDatabase = useTamagotchiDatabase();
  const router = useRouter();

  async function createTamagotchi() {
    if (nickName.trim() === "" || selectedIndex === 0) {
      return Alert.alert("Erro", "Todos os valores devem ser preenchidos");
    }

    const response = await tamagotchiDatabase.create({
      nickName,
      imageId: selectedIndex,
    });

    if (response.insertRowId == null) {
      return Alert.alert("Erro", "Erro ao criar tamagotchi");
    } else {
      setNickName("");
      setSelectedIndex(0);
      router.back();
    }
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
    
      <Input
        placeholder="Digite o nome do bicho"
        placeholderTextColor="#7D0631"
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        value={nickName}
        maxLength={19}
        onChangeText={(text) => setNickName(text)}
      />
      <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {urlsArray.map((skin) => (
          <Button
            key={skin.skinId}
            buttonStyle={styles.button}
            title={
              <Image
              source={skin.urlImage}
                style={styles.image}
              />
            }
            type="clear"
            onPress={() => setSelectedIndex(skin.skinId)}
            containerStyle={[
              styles.buttonContainer,
              skin.skinId === selectedIndex
                ? styles.selectedButtonContainer
                : null,
            ]}
          />
        ))}
      </View>
      </ScrollView>
      <Button
        size="md"
        color="#7D0631"
        buttonStyle={styles.registerButton}
        onPress={createTamagotchi}
      >
        {" "}
        Criar
      </Button>
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#FABA66",
    paddingTop: 60,
    paddingBottom: 20,
  },
  safeContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 850,
    backgroundColor: "rgba(250, 186, 102, 1)",
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
    width: 150,
    height: 150,
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
    width: 100,
    height: 100,
  },
  registerButton: {
    width: 100,
    borderRadius: 12,
    backgroundColor: "rgba(125, 6, 49, 0.4)",
    borderColor: "#7D0631",
    borderWidth: 2,
    marginTop: 20,
  },
});

export default Register;
