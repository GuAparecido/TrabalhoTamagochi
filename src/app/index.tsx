import Input from "@/components/input";
import { useEffect, useState } from "react";
import { View, Text, Button, Alert, FlatList, Pressable } from "react-native";
import { useProductDatabase, ProductDatabase } from "@/database/useProductDatabase";

const index = () => {

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [products, setProducts] = useState<ProductDatabase[]>([]);
    const [search, setSearch] = useState("");
    const productDatabase = useProductDatabase();

    async function create () {
        try {

            if(isNaN(Number(quantity))) {
                return Alert.alert("Quantidade", "A quantidade precisa ser numero")
            }
            
            const response = await productDatabase.create({name, quantity: Number(quantity)});
            
            Alert.alert("Produto cadastrado com ID: " + response.insertRowId)
        } catch (error) {
            
        }
    }

    async function update () {
        try {

            if(isNaN(Number(quantity))) {
                return Alert.alert("Quantidade", "A quantidade precisa ser numero")
            }
            
            const response = await productDatabase.update({id: Number(id), name, quantity: Number(quantity)});

        } catch (error) {
            
        }
    }

    async function list() {
        try {
            const response = await productDatabase.searchByName(search)
            setProducts(response);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSave() {
        if(id) {
            update();
        } else {
            create();
        }

        setId("");
        setName("");
        setQuantity("");
        list();
    }

    async function details(item:ProductDatabase) {
        setId(String(item.id));
        setName(item.name);
        setQuantity(quantity);
    }

    useEffect(() => {
        list()
    }, [search])

    return (
        <View style={{flex:1, justifyContent:'center', padding:32}}>
            <Input placeholder="Nome" onChangeText={setName} value={name}/> 
            <Input placeholder="Quantidade" onChangeText={setQuantity} value={quantity}/> 
            <Button title="Salvar" onPress={handleSave}> </Button>

            <Input placeholder="Pesquisar" onChangeText={setSearch}/> 

            <FlatList
                data={products}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item}) => <Pressable onPress={() => details(item)}>
                    <Text>{item.name} : {item.quantity}</Text>
                </Pressable>}
            >

            </FlatList>
        </View>
    );
}

export default index;