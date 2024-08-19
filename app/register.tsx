import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Input, Button } from '@rneui/themed';
import { useState } from "react";
import imageUrls from "@/image/imageUrls";

const newTamagotchi = {
    name: String,
    imgUrl: String,
}

const Register = () => {
    const [name, setName] = useState<string>("");
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const urlsArray: string[] = Array.from(imageUrls);

    const registerTamogotchi = () => {
        console.log({name, urlsArray});        
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Input
                placeholder='Digite o nome do bicho'
                placeholderTextColor='#7D0631'
                inputStyle={styles.input} 
                inputContainerStyle={styles.inputContainer} 
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <View style={styles.grid}>
                {urlsArray.map((url, index) => (
                    <Button
                        key={index}
                        buttonStyle={styles.button}
                        title={<Image source={{ uri: url }} style={styles.image} />}
                        type="clear" 
                        onPress={() => setSelectedIndex(index)} 
                        containerStyle={[
                            styles.buttonContainer,
                            index === selectedIndex ? styles.selectedButtonContainer : null
                        ]}
                    />
                ))}
            </View>
            <Button
                size="md"
                color='#7D0631'
                buttonStyle={styles.registerButton}
                onPress={registerTamogotchi}
            > Criar</Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        backgroundColor: "#FABA66",
        paddingTop: 20,
        paddingBottom: 20, 
    },
    input: {
        color: '#7D0631', 
    },
    inputContainer: {
        borderBottomColor: '#7D0631', 
        borderBottomWidth: 2, 
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: 10, 
    },
    button: {
        borderRadius: 50, 
        borderColor: '#7D0631', 
        borderWidth: 2, 
        backgroundColor: 'rgba(125, 6, 49, 0.3)', 
        width: 150, 
        height: 150,
    },
    buttonContainer: {
        width: 150,
        height: 150, 
    },
    selectedButtonContainer: {
        borderRadius: 50, // Arredondar os botões
        borderWidth: 2,
        backgroundColor: '#7D0631', // Cor de fundo do botão selecionado
    },
    image: {
        width: 100, // Tamanho da imagem dentro do botão
        height: 100,
    },
    registerButton: {
        width: 100,
        marginTop: 30,
    },
});

export default Register;
