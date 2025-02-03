import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/BottomTabScreens/HomeScreen';
import SearchScreen from '../screens/BottomTabScreens/SearchScreen';
import ListScreen from '../screens/BottomTabScreens/ListScreen';
import SettingsScreen from '../screens/BottomTabScreens/SettingsScreen';
import ProfileNavigator from '../navigators/ProfileNavigator'
import userData from '../userDataBackend/userData';

import { Image, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { profilePicture } = userData;
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
                source={{
                  uri: profilePicture }}
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
