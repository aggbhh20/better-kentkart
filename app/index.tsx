import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import ImageViewer from "../components/ImageViewer"
import Button from "../components/Button"
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const PlaceholderImage = require('../assets/images/icon.png');

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })
    if (!result.canceled) {
      // @ts-ignore
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("No Image Selected! Please select an image.")
    }

  }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
      <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      <Button label={"Choose an Image"} theme={"primary"}  onPress={pickImage}/>
      <br />
      <Button label={"Use this Image"} theme={""} onPress={console.log("using current image...")}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
