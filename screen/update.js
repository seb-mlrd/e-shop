import { StyleSheet, TextInput, Button, View, Text } from 'react-native'
import React, {useEffect, useState } from 'react'
import axios from 'axios'
import { URL } from '../constants/url'

export default function Update({route, navigation}) {
    const [article, setArticle] = useState([]);
    const {id} = route.params;

    useEffect(() => {
        const fetchArticle = async () => {
            try{
                const {data, status} = await axios.get(`${URL.FETCH_ARTICLE}${id}`)
                if(status == 200){
                    console.log('mange tes morts');
                }
                setArticle(data);
                console.log(article);
                
            }
            catch(error){
                throw error.message;
            }
        };
        fetchArticle();
    }, []);

    const _onChangeText = (key, value) => {

        setArticle({...article, [key]: value});
    };

    const _handleSubmit = async () => {
        try{
            const { data } = await axios.put(`${URL.UPDATE_ARTICLE}${id}`, article);

            if(data.status == 200){
                console.log('article updated');
            }
            navigation.navigate('List');
        }catch(error){
            throw error.message 
        }
    }
    
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Modifier un article</Text>
        {/* Champ de texte pour le pseudo du joueur */}
        <TextInput
        style={styles.textInput}
        defaultValue={article.name}
        maxLength={20}
        onChangeText={(val) => _onChangeText("name", val)}
        /> 
        {/* Champ de texte pour l'e-mail du joueur */}
        <TextInput
        style={styles.textInput}
        defaultValue={article.content}
        maxLength={20}
        onChangeText={(val) => _onChangeText("content", val)}
        />
        <TextInput
        style={styles.textInput}
        defaultValue={article.brand}
        maxLength={20}
        onChangeText={(val) => _onChangeText("brand", val)}
        />
        <TextInput
        style={styles.textInput}
        defaultValue={article.price}
        maxLength={20}
        onChangeText={(val) => _onChangeText("price", val)}
        />
        <TextInput
        style={styles.textInput}
        defaultValue={article.stock}
        maxLength={20}
        onChangeText={(val) => _onChangeText("stock", val)}
        />
        <Button title="Valider" onPress={_handleSubmit} color="#e74c3c"/>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2c3e50',
    },
    textInput: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
})