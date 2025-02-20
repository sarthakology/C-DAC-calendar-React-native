import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GlobalContext from "../../../context/GlobalContext";
import axios from 'axios';
import refreshJWTToken from '../../../services/RefreshJWTToken';
import API_URLS from '../../../ApiUrls';

export default function ProfileScreen({ navigation }) {
  const { resetAppData } = useContext(GlobalContext);
  const [profile, setProfile] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const accessToken = await refreshJWTToken();
      if (accessToken) {
        const response = await axios.get(API_URLS.GET_USER_PROFILE, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        });
        setProfile(response.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUserProfile();
    setRefreshing(false);
  }, []);

  const handleEditProfile = () => navigation.navigate('EditProfile');

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
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
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

        <View style={styles.container}>
          <Image source={{ uri: profile.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg" }} style={styles.profilePicture} />
          <Text style={styles.name}>{profile.name || "N/A"}</Text>

          <ProfileInfo label="Gender" value={profile.gender || "N/A"} />
          <ProfileInfo label="Role" value={profile.role || "N/A"} />
          <ProfileInfo label="Phone Number" value={profile.phno || "N/A"} />
          <ProfileInfo label="Email" value={profile.email || "N/A"} />
          <ProfileInfo label="Status" value={profile.accountStatus || "N/A"} />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
