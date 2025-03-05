import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useLanguages from '../../mastersApi/Languages';
import useCountries from '../../mastersApi/Countries';
import useDateFormats from '../../mastersApi/DateFormats';
import useTimezones from '../../mastersApi/TimeZones';
import { useTranslation } from 'react-i18next'; // Import the translation hook

const SettingsScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation(); // Initialize the translation hook
  const rawLanguageOptions = useLanguages();
  const rawCountryOptions = useCountries();
  const rawDateFormatOptions = useDateFormats();
  const rawTimezoneOptions = useTimezones();

  const languageOptions = rawLanguageOptions.map(({ language }) => ({ label: language, value: language }));
  const countryOptions = rawCountryOptions.map(({ country }) => ({ label: country, value: country }));
  const dateFormatOptions = rawDateFormatOptions.map(({ format }) => ({ label: format, value: format }));
  const timezoneOptions = rawTimezoneOptions.map(({ timezone }) => ({ label: timezone, value: timezone }));

  const timeFormatOptions = [
    { label: '1:00pm', value: '1:00pm' },
    { label: '13:00', value: '13:00' },
  ];

  const [language, setLanguage] = useState('English');
  const [country, setCountry] = useState('USA');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [primaryTimeZone, setPrimaryTimeZone] = useState('GMT');
  const [timeFormat, setTimeFormat] = useState('1:00pm');

  const [openLanguage, setOpenLanguage] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [openDateFormat, setOpenDateFormat] = useState(false);
  const [openPrimaryTZ, setOpenPrimaryTZ] = useState(false);
  const [openTimeFormat, setOpenTimeFormat] = useState(false);


 
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem('userSettings');
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setLanguage(parsedSettings.language || 'English');
          setCountry(parsedSettings.country || 'USA');
          setDateFormat(parsedSettings.dateFormat || 'MM/DD/YYYY');
          setPrimaryTimeZone(parsedSettings.primaryTimeZone || 'GMT');
          setTimeFormat(parsedSettings.timeFormat || '1:00pm');
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSettings();
  }, []);

  const handleSubmit = async () => {
    const settings = {
      language,
      country,
      dateFormat,
      primaryTimeZone,
      timeFormat,
      

    };

    try {
      await AsyncStorage.setItem('userSettings', JSON.stringify(settings));
      i18n.changeLanguage(settings.language);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View>
          <Text style={styles.header}>{t('Language and Region')}</Text>

          <View style={[styles.dropdownWrapper, { zIndex: 6 }]}>
            <Text style={styles.label}>{t('Language')}</Text>
            <DropDownPicker
              open={openLanguage}
              value={language}
              items={languageOptions}
              setOpen={setOpenLanguage}
              setValue={setLanguage}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>

          <View style={[styles.dropdownWrapper, { zIndex: 5 }]}>
            <Text style={styles.label}>{t('Country')}</Text>
            <DropDownPicker
              open={openCountry}
              value={country}
              items={countryOptions}
              setOpen={setOpenCountry}
              setValue={setCountry}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>

          <View style={[styles.dropdownWrapper, { zIndex: 4 }]}>
            <Text style={styles.label}>{t('Date Format')}</Text>
            <DropDownPicker
              open={openDateFormat}
              value={dateFormat}
              items={dateFormatOptions}
              setOpen={setOpenDateFormat}
              setValue={setDateFormat}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>

          <View style={[styles.dropdownWrapper, { zIndex: 3 }]}>
            <Text style={styles.label}>{t('Time Format')}</Text>
            <DropDownPicker
              open={openTimeFormat}
              value={timeFormat}
              items={timeFormatOptions}
              setOpen={setOpenTimeFormat}
              setValue={setTimeFormat}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>

          <View style={[styles.dropdownWrapper, { zIndex: 2 }]}>
            <Text style={styles.label}>{t('Primary Time Zone')}</Text>
            <DropDownPicker
              open={openPrimaryTZ}
              value={primaryTimeZone}
              items={timezoneOptions}
              setOpen={setOpenPrimaryTZ}
              setValue={setPrimaryTimeZone}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>{t('Save Changes')}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f4f4f4' },
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 8, marginTop: 15 },
  dropdownWrapper: { marginBottom: 15 },
  dropdown: { backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#ccc', borderRadius: 5 },
  dropdownContainer: { backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#ccc' },
  button: { backgroundColor: '#ffffff', paddingVertical: 12, borderWidth: 0.5, borderColor: 'black', borderRadius: 5, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#000000', fontSize: 16 },
});

export default SettingsScreen;
