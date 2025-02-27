import React, { useEffect, useState, useMemo } from 'react';
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

import useProfile from '../userDataBackend/ProfileData';

import { useTranslation } from 'react-i18next'; // Import the translation hook

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { t } = useTranslation(); // Initialize the translation hook
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const profileData = useProfile();

  const profile = useMemo(() => profileData || {
    name: "N/A",
    gender: "N/A",
    role: "N/A",
    phno: "N/A",
    email: "N/A",
    profilePicture: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
    accountStatus: "Public"
  }, [profileData]);

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
              <Image
                source={{ uri: profile.profilePicture }}
                style={[
                  styles.profileIcon,
                  { borderColor: focused ? 'black' : 'gray' },
                ]}
              />
            );
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: t('Home') }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ title: t('Search') }} />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          title: t('Profile'),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={async () => {
                const token = await AsyncStorage.getItem('accessToken');
                if (!token) {
                  navigation.navigate('Login');
                } else {
                  props.onPress();
                }
              }}
            />
          ),
        }}
      />
      <Tab.Screen name="List" component={ListScreen} options={{ title: t('List') }} />
      <Tab.Screen name="Setting" component={SettingsScreen} options={{ title: t('Settings') }} />
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
