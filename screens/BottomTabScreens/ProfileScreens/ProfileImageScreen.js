import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { uploadFileToFirebase } from "../../../firebase/FirebaseUpload";
import refreshJWTToken from '../../../services/RefreshJWTToken';
import API_URLS from '../../../ApiUrls';

export default function ProfileImageScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [profile, setProfile] = useState({});
  const [showSaveButton, setShowSaveButton] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const accessToken = await refreshJWTToken();
      if (accessToken) {
        const response = await axios.get(API_URLS.GET_USER_PROFILE, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
        });
        setProfile(response.data);
        setSelectedImage(response.data.profilePicture);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleEditPress = () => {
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
        setShowSaveButton(true); // Show the save button when a new image is selected
      }
    });
  };

  const handleSave = async () => {
    try {
      if (!selectedImage) return;
  
      // Convert selected image to Blob before uploading
      const responseBlob = await fetch(selectedImage);
      const blob = await responseBlob.blob();
  
      // Upload image to Firebase and get the URL
      uploadFileToFirebase(blob, async (url) => {
        console.log("Firebase Image URL:", url);
  
        // Ensure email is included in the request
        const updatedData = {
          name: profile.name,
          gender: profile.gender,
          role: profile.role,
          phno: profile.phno,
          accountStatus :profile.accountStatus,
          email: profile.email,  // Required by backend
          profilePicture: url,   // Updating only profilePicture
        };


        //   const updatedData = {
        //     name,
        //     gender,
        //     role: profile.role,
        //     phno,
        //     email: profile.email,
        //     profilePicture: profile.profilePicture,
        //     accountStatus
        //   };
  
        const accessToken = await refreshJWTToken(navigation);
  
        await axios.put(API_URLS.UPDATE_USER_PROFILE, updatedData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        });
  
        Alert.alert('Success', 'Profile image updated successfully.');
        setShowSaveButton(false);
        setProfile({ ...profile, profilePicture: url });
        navigation.navigate('UserProfile');
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{ uri: selectedImage }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        {/* Show Save Image Button when an image is selected */}
        {showSaveButton && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Image</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#333333',
  },
  container: {
    flexGrow: 1,
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
  saveButton: {
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

