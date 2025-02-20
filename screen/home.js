import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { URL } from '../constants/url'
export default function Home({ navigation }) {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        const fetchArticles = async () => {
            try{
                const {data, status} = await axios.get(URL.FETCH_ARTICLES)
                setArticles(data)

                if(status !== 200){
                    throw new Error('Error fetching articles')
                }
            }catch(error){
                throw error.message;
            }
        }
        fetchArticles()
    },[])
  return (
    <View style={styles.view}>
      <Text style={styles.title}>Nos Articles</Text>
      <FlatList
        data={articles}
        renderItem={({item}) => (
            <Pressable onPress={() => navigation.navigate('Detail', {id: item._id})} style={styles.card}>
                <Image
                    key={item._id}
                    style={styles.image}
                    source={{
                        uri: `${URL.BASE}${item.picture.img}`,
                    }}
                />
                <View style={styles.cardContent}>
                    <Text style={styles.articleTitle}>{item.name}</Text>
                    <Text style={styles.content}>{item.content}</Text>
                    <Text style={styles.brand}>Marque: {item.brand}</Text>
                    <Text style={styles.price}>Prix: {item.price} €</Text>
                    <Text style={styles.stock}>Stock : {item.stock}</Text>
                </View>
            </Pressable>
        )}
        keyExtractor={item => item._id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 15,
        padding: 15,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: 8,
    },
    cardContent: {
        marginTop: 10,
        alignItems: 'center',
    },
    articleTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    content: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 5,
    },
    brand: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 5,
    },
    stock: {
        fontSize: 14,
        color: '#999',
    },
})