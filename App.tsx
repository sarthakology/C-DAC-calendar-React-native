import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigators/StackNavigator';
import ContextWrapper from "./context/ContextWrapper";
export default function App() {
  return (
    <NavigationContainer>
      <ContextWrapper>
        <AppNavigator />
      </ContextWrapper>
    </NavigationContainer> 
  );
} 
  