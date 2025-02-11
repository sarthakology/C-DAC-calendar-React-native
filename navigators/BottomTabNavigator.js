import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, StyleSheet, ActivityIndicator, View, TouchableOpacity } from 'react-native';

import HomeScreen from '../screens/BottomTabScreens/HomeScreen';
import SearchScreen from '../screens/BottomTabScreens/SearchScreen';
import ListScreen from '../screens/BottomTabScreens/ListScreen';
import SettingsScreen from '../screens/BottomTabScreens/SettingsScreen';
import ProfileNavigator from '../navigators/ProfileNavigator';
import userData from '../userDataBackend/userData';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { profilePicture } = userData;
  const navigation = useNavigation(); // Access navigation object
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setIsLoggedIn(!!token);
    };

    checkAuth();
  }, []);

  if (isLoggedIn === null) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Setting') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'List') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Profile') {
            return (
              <TouchableOpacity
                onPress={async () => {
                  const token = await AsyncStorage.getItem('accessToken');
                  if (!token) {
                    navigation.navigate('Login'); // Redirect to Login if no token
                  } else {
                    navigation.navigate('Profile'); // Navigate to Profile if token exists
                  }
                }}
              >
                <Image
                  source={{ uri: profilePicture }}
                  style={[
                    styles.profileIcon,
                    { borderColor: focused ? 'black' : 'gray' },
                  ]}
                />
              </TouchableOpacity>
            );
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
      <Tab.Screen name="List" component={ListScreen} />
      <Tab.Screen name="Setting" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
