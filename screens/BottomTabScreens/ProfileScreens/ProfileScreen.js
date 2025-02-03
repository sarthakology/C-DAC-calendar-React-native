import React,{ useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import userData from '../../../userDataBackend/userData';
import GlobalContext from "../../../context/GlobalContext";

export default function ProfileScreen({ navigation }) {
  const { dispatchCalEvent, dispatchCalTask } = useContext(GlobalContext);
  const { name, gender, role, phno, email, profilePicture } = userData;

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleLogout = async () => {
    try {
      // Clear savedEvents and savedTasks from AsyncStorage
      await AsyncStorage.removeItem('savedEvents');
      await AsyncStorage.removeItem('savedTasks');
  
      console.log('savedEvents and savedTasks cleared from AsyncStorage.');
  
      // Clear state
      dispatchCalEvent({ type: 'deleteAll' });
      dispatchCalTask({ type: 'deleteAll' });
  
      Alert.alert('Logout', 'You have been logged out.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error clearing savedEvents and savedTasks from AsyncStorage:', error);
    }
  };
  

  const handleHelp = () => {
    navigation.navigate('Help');
  };

  const handleAdmin = () => { 
    navigation.navigate('Admin');
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleHelp} style={styles.iconButton}>
          <Ionicons name="help-circle-outline" size={30} color="#007bff" />
        </TouchableOpacity>
        {role === 'admin' && (
          <TouchableOpacity onPress={handleAdmin} style={styles.iconButton}>
            <Ionicons name="person-circle-outline" size={30} color="#007bff" />
          </TouchableOpacity> 
        )}
      </View>

      <View style={styles.container}>
        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        <Text style={styles.name}>{name}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{gender}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Role:</Text>
          <Text style={styles.value}>{role}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.value}>{phno}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{email}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  iconButton: {
    padding: 8,
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
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
    width: 140,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 30,
  },
  button: {
    flex: 1,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#007bff',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
