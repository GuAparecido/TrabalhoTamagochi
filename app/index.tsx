import { useRouter } from "expo-router";
import { Image, View, StyleSheet } from "react-native";
import imageUrls from "@/image/imageUrls";
import { Button } from '@rneui/themed';

const Index = () => {
    const router = useRouter();
    const urlsArray: string[] = Array.from(imageUrls);

    return (
        <View style={styles.container}>
            <Button
                size="md"
                color='#7D0631'
                buttonStyle={styles.button}
                onPress={() => router.push('/register')}
            >
                Criar
            </Button>
            {urlsArray.map((url, index) => (
                <Image
                    key={index}
                    source={{ uri: url }}
                    style={styles.image}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FABA66",
    },
    button: {
        width: 100,
        marginTop: 30,
    },
    image: {
        width: 30,
        height: 30,
        marginTop: 10, 
    },
});

export default Index;
