import { StyleSheet, TextInput, View, Button, ScrollView, CheckBox, Image } from 'react-native'
import React, {useState} from 'react'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import { URL } from '../constants/url'
import { Text } from 'react-native-web';
export default function Add({ navigation }) {
    const imgInput = ['img', 'img1', 'img2', 'img3', 'img4'];
  const [article, setArticle] = useState({
    name: '',
    content: '',
    category: '',
    brand: '',
    price: 0,
    img: [],
    status: true,
    stock: 0,
  });

  
  const handleChange = (name, value) => {
      if (name.startsWith('img')) {
          setArticle((prev) => ({
              ...prev,
              img: [...prev.img, value],
            }));
        } else {
            setArticle((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    
    const selectImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaType: ImagePicker.MediaTypeOptions.Images,  // Permet uniquement les images
        allowsEditing: true,  // Permet de modifier l'image avant la sélection
        quality: 1,  // Qualité maximale de l'image
      });
  
      if (!result.canceled && result.assets.length > 0) {
        handleChange('img', result.assets[0]);  // Enregistrer l'image sélectionnée dans le state
      }
    };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', article.name);
    formData.append('content', article.content);
    formData.append('category', article.category);
    formData.append('brand', article.brand);
    formData.append('price', parseInt(article.price));
    formData.append('status', article.status);
    formData.append('stock', parseInt(article.stock));

   article.img.forEach((image) => {
      formData.append('img', {
        uri: image.uri,   // Utilisation de l'URI de l'image sélectionnée
        type: image.type, // Type MIME de l'image
        name: image.fileName,  // Nom de l'image
      });
    });

    try{
        const {data} = await axios.post(URL.CREATE_ARTICLE, formData, {
            'headers': {
                'Content-Type': 'multipart/form-data',
            },
        })
        if(data.status == 200){
            return console.log('article created');
        }
    }catch(error){
        throw error.message;
    }
}

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ajouter un article</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom de l'article"
        value={article.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={article.content}
        onChangeText={(text) => handleChange('content', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Catégorie"
        value={article.category}
        onChangeText={(text) => handleChange('category', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Marque"
        value={article.brand}
        onChangeText={(text) => handleChange('brand', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Prix"
        keyboardType="numeric"
        value={article.price.toString()}
        onChangeText={(text) => handleChange('price', text)}
      />
      {imgInput.map((imgName, index) => (
        <View key={imgName} style={styles.imgInputContainer}>
          <Text>{index === 0 ? 'Image principale (Sélectionner une image):' : `Image ${index} (Sélectionner une image):`}</Text>
          <Button title={`Choisir ${imgName}`} onPress={selectImage} />
          {article.img[index] && (
            <Image
              source={{ uri: article.img[index].uri }}
              style={{ width: 100, height: 100, marginTop: 10 }}
            />
          )}
        </View>
      ))}
      <TextInput
        style={styles.input}
        placeholder="Stock"
        keyboardType="numeric"
        value={article.stock.toString()}
        onChangeText={(text) => handleChange('stock', text)}
      />
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={article.status}
          onValueChange={(value) => setArticle((prev) => ({ ...prev, status: value }))}
        />
        <Text>Disponible</Text>
      </View>
      <Button title="Ajouter l'article" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  imgInputContainer: {
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
