import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/BottomTabScreens/HomeScreen';
import SearchScreen from '../screens/BottomTabScreens/SearchScreen';
import ListScreen from '../screens/BottomTabScreens/ListScreen';
import SettingsScreen from '../screens/BottomTabScreens/SettingsScreen';
import ProfileNavigator from '../navigators/ProfileNavigator'

import { Image, StyleSheet } from 'react-native';

// Replace Settings with Profile
const Tab = createBottomTabNavigator();

export default function BottomTabs() {
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
            // Change to settings icon
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'List') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Profile') {
            return (
              <Image
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/fir-44d31.appspot.com/o/images%2Fsample1.jpgca9a9b72-3770-49e6-8281-7ae5e6f657d3?alt=media&token=2f514c54-2925-46bd-8721-9f47051657e3",
                }}
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
});
