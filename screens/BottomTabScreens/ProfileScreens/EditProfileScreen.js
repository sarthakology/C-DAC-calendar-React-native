import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import useProfile from '../../../userDataBackend/ProfileData';
import API_URLS from '../../../ApiUrls';
import refreshJWTToken from '../../../services/RefreshJWTToken';
import { useTranslation } from 'react-i18next'; // Import translation hook

export default function EditProfileScreen({ navigation }) {
  const profileData = useProfile();
  const { t } = useTranslation(); // Initialize the translation hook

  const profile = useMemo(() => profileData || {
    name: "N/A",
    gender: "N/A",
    role: "N/A",
    phno: "N/A",
    email: "N/A",
    profilePicture: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
    accountStatus: "Public"
  }, [profileData]);

  const [name, setName] = useState(profile.name);
  const [gender, setGender] = useState(profile.gender);
  const [phno, setPhno] = useState(profile.phno);
  const [accountStatus, setAccountStatus] = useState(profile.accountStatus);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);

  useEffect(() => {
    setName(profile.name);
    setGender(profile.gender);
    setPhno(profile.phno);
    setAccountStatus(profile.accountStatus);
  }, [profile]);

  const handleSave = async () => {
    try {
      const updatedData = {
        name,
        gender,
        role: profile.role,
        phno,
        email: profile.email,
        profilePicture: profile.profilePicture,
        accountStatus
      };

      const accessToken = await refreshJWTToken(navigation);

      await axios.put(API_URLS.UPDATE_USER_PROFILE, updatedData, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });

      Alert.alert(t('successTitle'), t('successMessage'));
      navigation.goBack();
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert(t('errorTitle'), t('errorMessage'));
    }
  };

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setModalVisible(false);
  };

  const handleStatusSelect = (selectedStatus) => {
    setAccountStatus(selectedStatus);
    setStatusModalVisible(false);
  };

  const handleProfilePictureClick = () => {
    navigation.navigate('ProfileImage');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>

          {/* Profile Picture */}
          <TouchableOpacity onPress={handleProfilePictureClick}>
            <Image source={{ uri: profile.profilePicture }} style={styles.profilePicture} />
          </TouchableOpacity>

          <Text style={styles.title}>{t('editProfile')}</Text>

          {/* Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('name')}</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
          </View>

          {/* Gender Selection */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('gender')}</Text>
            <TouchableOpacity style={styles.dropdown} onPress={() => setModalVisible(true)}>
              <Text style={styles.dropdownText}>{gender}</Text>
            </TouchableOpacity>
          </View>

          {/* Role (Read-only) */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('role')}</Text>
            <TextInput style={styles.input} value={profile.role} editable={false} />
          </View>

          {/* Account Status Selection */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('accountStatus')}</Text>
            <TouchableOpacity style={styles.dropdown} onPress={() => setStatusModalVisible(true)}>
              <Text style={styles.dropdownText}>{accountStatus}</Text>
            </TouchableOpacity>
          </View>

          {/* Phone Number Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('phoneNumber')}</Text>
            <TextInput
              style={styles.input}
              value={phno.toString()}
              onChangeText={setPhno}
              keyboardType="phone-pad"
            />
          </View>

          {/* Email (Read-only) */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('email')}</Text>
            <TextInput style={styles.input} value={profile.email} editable={false} />
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>{t('saveChanges')}</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* Gender Selection Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('selectGender')}</Text>
            {["Male", "Female", "Other"].map((option) => (
              <TouchableOpacity key={option} style={styles.modalOption} onPress={() => handleGenderSelect(option)}>
                <Text style={styles.modalText}>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.modalOption, styles.cancelButton]} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalText}>{t('cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Account Status Selection Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={statusModalVisible}
        onRequestClose={() => setStatusModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('selectAccountStatus')}</Text>
            {["Public", "Private"].map((status) => (
              <TouchableOpacity key={status} style={styles.modalOption} onPress={() => handleStatusSelect(status)}>
                <Text style={styles.modalText}>{status}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.modalOption, styles.cancelButton]} onPress={() => setStatusModalVisible(false)}>
              <Text style={styles.modalText}>{t('cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    justifyContent: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    backgroundColor: '#28a745',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
  },
  cancelButton: {
    borderBottomWidth: 0,
    marginTop: 10,
  },
});
