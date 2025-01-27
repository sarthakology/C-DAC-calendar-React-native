import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import userData from '../../../userDataBackend/userData';

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState(userData.name);
  const [gender, setGender] = useState(userData.gender);
  const role = userData.role
  const [phno, setPhno] = useState(userData.phno);
  const email = userData.email
  const [profilePicture, setProfilePicture] = useState(userData.profilePicture);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state

  const handleSave = () => {
    const updatedData = {
      name,
      gender,
      role,
      phno,
      email,
      profilePicture,
    };
    console.log('Updated Profile Data:', updatedData);
    Alert.alert('Success', 'Profile updated successfully.');
    navigation.goBack();
  };

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        <Text style={styles.title}>Edit Profile</Text>

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>

        {/* Gender Selection */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.dropdownText}>{gender}</Text>
          </TouchableOpacity>
        </View>

        {/* Role Display (Non-editable) */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Role</Text>
          <TextInput style={styles.input} value={role} editable={false} />
        </View>

        {/* Phone Number Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phno.toString()}
            onChangeText={(value) => setPhno(Number(value) || 0)}
            keyboardType="phone-pad"
          />
        </View>

        {/* Email Display (Non-editable) */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            keyboardType="email-address"
            editable={false}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>

        {/* Modal for Gender Selection */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Gender</Text>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleGenderSelect('Male')}
              >
                <Text style={styles.modalText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleGenderSelect('Female')}
              >
                <Text style={styles.modalText}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleGenderSelect('Other')}
              >
                <Text style={styles.modalText}>Other</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalOption, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
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
