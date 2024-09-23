import { Button } from "@rneui/base";
import { router, useGlobalSearchParams } from "expo-router";
import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from "react-native";

const jogos = () => {
    const idParams = useGlobalSearchParams();

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ImageBackground 
                    source={require("@/assets/images/JogoDaVelhaTamagotchi.jpg")}>
                    <Button
                    buttonStyle={styles.jogos}
                    onPress={() => router.push({
                        pathname: "/jogoDaVelha",
                        params: { id: idParams.id },
                      })}>
                    </Button>
            </ImageBackground>
        <ImageBackground style={{width:350}}
            source={require("@/assets/images/forca.png")}
        >
            <Button buttonStyle={styles.jogos}
        onPress={() => router.push({
            pathname: "/forca",
            params: { id:  idParams.id},
          })}></Button>
        </ImageBackground>
        </SafeAreaView>
    );
}

export default jogos;

const styles = StyleSheet.create ({
    safeContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 850,
        backgroundColor: "rgba(250, 186, 102, 1)",
    },
    jogos: {
        width: 400,
        height: 440,
        backgroundColor: 'transparent',
        borderBottomWidth: 2,
        borderColor: "#7D3106"
    },

})