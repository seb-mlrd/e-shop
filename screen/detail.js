import { StyleSheet, Text, View, Button, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { URL } from '../constants/url'

export default function Detail({ route, navigation }) {
    const [article, setArticle] = useState([]);
    const { id } = route.params;

    useEffect(() => {
        const fetchArticle = async () => {
            try{
                const {data, status} = await axios.get(`${URL.FETCH_ARTICLE}${id}`)
                if(status == 200){
                    console.log('success my friend');
                }
                setArticle(data)
                
            }catch(error){
                throw error.message;
            }
        }
        fetchArticle()
    }, [])
    console.log(article);
    
    const deleteArticle = async () => {
        try{
            const {data, status} = await axios.delete(`${URL.DELETE_ARTICLE}${id}`)
            if(status == 200){
                console.log(data);
                navigation.goBack();
            }
        }catch(error){
            throw error.message;
        }
    }

    console.log("Picture :", article.picture);
    console.log("Picture.img :", article.picture?.img);

  return (
    <View style={styles.container}>
        {article.picture && Object.values(article.picture).map((img, index) => (
            <Image
                key={index}
                style={styles.image}
                source={{ uri: `${URL.BASE}${img}` }}
            />
        ))}
        <Text style={styles.title}>{article.name}</Text>
        <Text style={styles.content}>{article.content}</Text>
        <Text style={styles.brand}>{article.brand}</Text>
        <View style={styles.buttonContainer}>
            <Button title='suprimer' onPress={deleteArticle} color="#e74c3c"/>
            <Button title='modifier' onPress={() => navigation.navigate('Update', {id: article._id})} color="#3498db"/>
        </View>
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
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2c3e50',
    },
    content: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
        color: '#7f8c8d',
    },
    brand: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        color: '#34495e',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
    },
})