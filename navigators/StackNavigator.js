import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import RegisterScreen from '../screens/AuthScreens/RegisterScreen';

import HelpScreen from '../screens/HelpScreen';
import SettingsScreen from '../screens/BottomTabScreens/SettingsScreen';

import AdminPanelScreen from '../screens/AdminScreens/AdminPanelScreen';
// Admin Screens
import CountriesAdmin from '../screens/AdminScreens/CountriesAdmin';
import DeleteUsersAdmin from '../screens/AdminScreens/DeleteUsersAdmin';
import FormatsAdmin from '../screens/AdminScreens/FormatsAdmin';
import LanguagesAdmin from '../screens/AdminScreens/LanguagesAdmin';
import RoleUpdateAdmin from '../screens/AdminScreens/RoleUpdateAdmin';
import TimezonesAdmin from '../screens/AdminScreens/TimezonesAdmin';

import BottomTabs from './BottomTabNavigator';

import EventModel from '../modals/EventModel';
import GlobalContext from '../context/GlobalContext';
import TaskModal from '../modals/TaskModal';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const {showEventModal, showTaskModal} = useContext(GlobalContext);
  return (
    <>
      <Stack.Navigator initialRouteName="main">
        <Stack.Screen
          name="main"
          component={BottomTabs}
          options={{headerShown: false}}
        />

        {/*Auth Screens*/}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Help"
          component={HelpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Setting"
          component={SettingsScreen}
          options={{headerShown: false}}
        />

        {/*Admin only Screens*/}
        <Stack.Screen
          name="Admin"
          component={AdminPanelScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="countries"
          component={CountriesAdmin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="deleteUsers"
          component={DeleteUsersAdmin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="formats"
          component={FormatsAdmin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="languages"
          component={LanguagesAdmin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="roleUpdate"
          component={RoleUpdateAdmin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="timezones"
          component={TimezonesAdmin}
          options={{headerShown: false}}
        />
      </Stack.Navigator>

      {/*this is for toggling  model */}

      {showEventModal && <EventModel />}
      {showTaskModal && <TaskModal />}
    </>
  );
}
