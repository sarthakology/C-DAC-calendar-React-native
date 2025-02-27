import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import translation files
import en from './Translations/en.json';
import hi from './Translations/hi.json';
import fr from './Translations/fr.json';
import gr from './Translations/gr.json';
import ru from './Translations/ru.json';
import ja from './Translations/ja.json';
import ko from './Translations/ko.json';


// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      english: { translation: en },
      hindi: { translation: hi },
      french: { translation: fr },
      german: { translation: gr },
      russian: { translation: ru },
      japanese: { translation: ja },
      korean: { translation: ko },
    },
    lng: 'english', // Default language
    fallbackLng: 'enlish', // Fallback if a translation is missing
    compatibilityJSON: 'v3', // Ensures compatibility with React Native
    interpolation: { escapeValue: false },
    react: {
      useSuspense: false, // Required for React Native
    },
  });

// Function to change and persist language
export const changeLanguage = async (lng) => {
  try {
    await AsyncStorage.setItem('language', lng);
    i18n.changeLanguage(lng);
  } catch (error) {
    console.error('Error saving language:', error);
  }
};

// Load saved language at startup
(async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  } catch (error) {
    console.error('Error loading saved language:', error);
  }
})();

export default i18n;
