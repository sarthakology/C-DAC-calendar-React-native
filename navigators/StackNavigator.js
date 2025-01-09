import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

import HelpScreen from '../screens/HelpScreen';

import AdminPanelScreen from '../screens/AdminPanelScreen';
// Admin Screens
import CountriesAdmin from '../screens/AdminScreens/CountriesAdmin';
import DeleteUsersAdmin from '../screens/AdminScreens/DeleteUsersAdmin';
import FormatsAdmin from '../screens/AdminScreens/FormatsAdmin';
import LanguagesAdmin from '../screens/AdminScreens/LanguagesAdmin';
import RoleUpdateAdmin from '../screens/AdminScreens/RoleUpdateAdmin';
import TimezonesAdmin from '../screens/AdminScreens/TimezonesAdmin';

import BottomTabs from './BottomTabNavigator';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="main">

      <Stack.Screen name="main" component={BottomTabs} options={{ headerShown: false }} />

      {/*Auth Screens*/}
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

      {/*profile Screens*/}
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />

      <Stack.Screen name="Help" component={HelpScreen} options={{ headerShown: false }} />





      {/*Admin only Screens*/}
      <Stack.Screen name="Admin" component={AdminPanelScreen} options={{ headerShown: false }} />

      <Stack.Screen name="countries" component={CountriesAdmin} options={{ headerShown: false }} />
      <Stack.Screen name="deleteUsers" component={DeleteUsersAdmin} options={{ headerShown: false }} />
      <Stack.Screen name="formats" component={FormatsAdmin} options={{ headerShown: false }} />
      <Stack.Screen name="languages" component={LanguagesAdmin} options={{ headerShown: false }} />
      <Stack.Screen name="roleUpdate" component={RoleUpdateAdmin} options={{ headerShown: false }} />
      <Stack.Screen name="timezones" component={TimezonesAdmin} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
