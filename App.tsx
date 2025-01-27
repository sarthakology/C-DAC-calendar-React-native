import React, { useContext  } from "react";
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigators/StackNavigator';
import ContextWrapper from "./context/ContextWrapper";
import GlobalContext from "./context/GlobalContext";
export default function App() {
  const { savedEvents } = useContext(GlobalContext); 
  console.log(savedEvents)
  return (
    <NavigationContainer>
      <ContextWrapper>

      <AppNavigator />
      </ContextWrapper>
    </NavigationContainer>
  );
} 
