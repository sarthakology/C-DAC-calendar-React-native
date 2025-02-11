import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GlobalContext from "../../../context/GlobalContext";
import useProfile from '../../../userDataBackend/ProfileData';

export default function ProfileScreen({ navigation }) {
  const { resetAppData } = useContext(GlobalContext);
  const profileData = useProfile(); // Directly access profile data

  // Default values (in case profileData is null)
  const profile = {
    name: profileData?.name || "N/A",
    gender: profileData?.gender || "N/A",
    role: profileData?.role || "N/A",
    phno: profileData?.phno || "N/A",
    email: profileData?.email || "N/A",
    profilePicture: profileData?.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
    accountStatus: profileData?.accountStatus || "Public"
  };

  // Handle profile edit
  const handleEditProfile = () => navigation.navigate('EditProfile');

  // Handle logout
  const handleLogout = async () => {
    try {
      resetAppData();
      Alert.alert('Logout', 'You have been logged out.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Help')} style={styles.iconButton}>
          <Ionicons name="help-circle-outline" size={30} color="#007bff" />
        </TouchableOpacity>
        {profile.role === 'admin' && (
          <TouchableOpacity onPress={() => navigation.navigate('Admin')} style={styles.iconButton}>
            <Ionicons name="person-circle-outline" size={30} color="#007bff" />
          </TouchableOpacity> 
        )}
      </View>

      {/* Profile Section */}
      <View style={styles.container}>
        <Image source={{ uri: profile.profilePicture }} style={styles.profilePicture} />
        <Text style={styles.name}>{profile.name}</Text>

        <ProfileInfo label="Gender" value={profile.gender} />
        <ProfileInfo label="Role" value={profile.role} />
        <ProfileInfo label="Phone Number" value={profile.phno} />
        <ProfileInfo label="Email" value={profile.email} />

        {/* Action Buttons */}
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

// ✅ Extracted a reusable ProfileInfo component
const ProfileInfo = ({ label, value }) => (
  <View style={styles.infoContainer}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

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

