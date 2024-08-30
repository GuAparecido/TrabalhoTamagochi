import { useRouter } from "expo-router";
import { Image, View, StyleSheet, Text,ScrollView } from "react-native";
import imageUrls from "@/image/imageUrls";
import { Input, Button } from '@rneui/themed';
import { Tamagotchi, useTamagotchiDatabase } from "@/database/useTamagotchiDatabase";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';

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

    useFocusEffect(
        useCallback(() => {
            findTamagochis(); 
        }, [search])
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Input
                placeholder='Busque seu Tamagochi'
                placeholderTextColor='#7D0631'
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
                onChangeText={setSearch}
            />

            <View style={styles.grid}>
                {tamagotchis.map((tamagotchi) => (
                    <Button
                        key={tamagotchi.id}
                        buttonStyle={styles.button}
                        // onPress={() => router.push(`/home ${tamagotchi.id}`)} // Atentar ao banco que puxará o id do Tamagochi e trará relacionado ao tamagochi
                        title={
                            <View style={styles.buttonContent}>
                                <Image source={{ uri: urlsArray.find(image => image.skinId === tamagotchi.imageId)?.urlImage }} style={styles.image} />
                                <View style={styles.divider} />
                                <Text style={styles.buttonText}>{tamagotchi.nickName}</Text>
                            </View>
                        }
                        type="clear"
                    />
                ))}
            </View>

            <Button
                size="md"
                color='#7D0631'
                buttonStyle={styles.registerButton}
                onPress={() => router.push(`/(tabs)/`)} //Adicionar a page que deseja acessar
                style={{width: 200}}
            >
                Novo
            </Button>
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
    registerbutton: {
        width: 200,
        marginTop: 30,
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
        borderRadius: 50,
        borderWidth: 2,
        backgroundColor: '#7D0631',
    },
    image: {
        width: 80,
        height: 80,
    },
    buttonContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: '#7D0631',
        marginVertical: 8,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    },
    registerButton: {
        width: 100,
        marginTop: 30,
    },
});

export default Index;
