import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import ImageViewer from "../components/ImageViewer"
import Button from "../components/Button"
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import CircleButton from '../components/CircleButton';
import IconButton from '../components/IconButton';
import EmojiPicker from '../components/EmojiPicker'
import ImageList from '../components/ImageList'
import EmojiSticker from '../components/emojiSticker'

const PlaceholderImage = require('../assets/images/icon.png');

export default function App() {

  const [modalVisible, setModalVisible] = useState(false); 
  const [showAppOptions, setShowAppOptions] = useState(null);
  const [selectedImage, setSelectedImage] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })
    if (!result.canceled) {
      // @ts-ignore
      setSelectedImage(result.assets[0].uri);
      // @ts-ignore
      setShowAppOptions(true);
    } else {
      alert("No Image Selected! Please select an image.")
    }

  }

  const onAddSticker = () => {
    setModalVisible(true);
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };
  
  const onModalClose =() => {
    setModalVisible(false);
  }

  const onReset = () => {
    //@ts-ignore
    setShowAppOptions(false);
    setSelectedEmoji(null);
  }


  return (

    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
        {selectedEmoji && <EmojiSticker imageSize={50} stickerSource={selectedEmoji} />}
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
        <View style={styles.optionsRow}>
          <IconButton icon="refresh" label="Reset" onPress={onReset} />
          <CircleButton onPress={onAddSticker} />
          <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
        </View>
      </View>
      ) : (
        <View>
          <br />
          <br />
        <View style={styles.buttonsContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImage} />
          <Button theme="" label="Use this photo" onPress={() => setShowAppOptions(true)} />
          </View>
        </View>
      )}
      <EmojiPicker isVisible={modalVisible} onClose={onModalClose}>
        {/* A list of emoji component will go here */}
        <ImageList onSelect={setSelectedEmoji} onCloseModal={onModalClose}></ImageList>
      </EmojiPicker>
    </View>

  )

}


// }

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
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonsContainer: {
    paddingBottom: 50,
  },
});
