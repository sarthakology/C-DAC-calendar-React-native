import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigators/StackNavigator";
import ContextWrapper from "./context/ContextWrapper";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <ContextWrapper>
          <AppNavigator />
        </ContextWrapper>
      </NavigationContainer>
    </I18nextProvider>
  );
}
