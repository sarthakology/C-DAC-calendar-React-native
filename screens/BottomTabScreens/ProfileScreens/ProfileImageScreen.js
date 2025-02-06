import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';
import userData from '../../../userDataBackend/userData';
import { uploadFileToFirebase } from "../../../firebase/FirebaseUpload";

export default function ProfileImageScreen() {
  const { profilePicture } = userData;
  const [selectedImage, setSelectedImage] = useState(profilePicture);
  const [imgURL, setImgURL] = useState(null); // State to store Firebase image URL
  const [showConsoleButton, setShowConsoleButton] = useState(false); // State to show the button

  const handleEditPress = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        Alert.alert('Image Picker', 'User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Image Picker Error', response.errorMessage || 'Something went wrong');
      } else if (response.assets && response.assets.length > 0) {
        const selectedUri = response.assets[0].uri;
        setSelectedImage(selectedUri);
        setShowConsoleButton(true); // Show the button when an image is selected

        // Convert the selected image to a Blob before uploading
        const responseBlob = await fetch(selectedUri);
        const blob = await responseBlob.blob();

        // Upload image to Firebase and get the URL
        uploadFileToFirebase(blob, (url) => {
          setImgURL(url);
          console.log("Firebase Image URL:", url);
        });
      }
    });
  };

  const handleConsolePress = () => {
    console.log("Selected Image URI:", imgURL);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={{ uri: imgURL || selectedImage }} // Show uploaded image or selected image
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        {/* Show Console Button when an image is selected */}
        {showConsoleButton && (
          <TouchableOpacity style={styles.consoleButton} onPress={handleConsolePress}>
            <Text style={styles.consoleButtonText}>Change profile</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#333333',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  profileImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1, // Ensure the image is square
    resizeMode: 'cover',
  },
  editButton: {
    position: 'absolute',
    top: '5%',
    right: '5%',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    backgroundColor: '#000000',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  consoleButton: {
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  consoleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
