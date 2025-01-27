import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ProfileScreen from '../screens/BottomTabScreens/ProfileScreens/ProfileScreen';
import EditProfileScreen from '../screens/BottomTabScreens/ProfileScreens/EditProfileScreen';

const Stack = createStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator initialRouteName="UserProfile">
      {/*profile Screens*/}
      <Stack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}