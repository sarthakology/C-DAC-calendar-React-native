import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  // Demo data
  const languageOptions = [
    { label: 'English', value: 'English' },
    { label: 'Spanish', value: 'Spanish' },
    { label: 'French', value: 'French' },
  ];

  const countryOptions = [
    { label: 'USA', value: 'USA' },
    { label: 'Canada', value: 'Canada' },
    { label: 'India', value: 'India' },
  ];

  const dateFormatOptions = [
    { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
    { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
    { label: 'YYYY/MM/DD', value: 'YYYY/MM/DD' },
  ];

  const timezoneOptions = [
    { label: 'GMT', value: 'GMT' },
    { label: 'UTC', value: 'UTC' },
    { label: 'IST', value: 'IST' },
  ];

  const timeFormatOptions = [
    { label: '1:00pm', value: '1:00pm' },
    { label: '13:00', value: '13:00' },
  ];

  // State management for dropdowns
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

  // Load settings from AsyncStorage
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

  // Save settings to AsyncStorage
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
      console.log('Settings saved:', settings);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View>
        <Text style={styles.header}>Language and Region</Text>

        {/* Language Selection */}
        <View style={[styles.dropdownWrapper, { zIndex: 6 }]}>
          <Text style={styles.label}>Language</Text>
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

        {/* Country Selection */}
        <View style={[styles.dropdownWrapper, { zIndex: 5 }]}>
          <Text style={styles.label}>Country</Text>
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

        {/* Date Format Selection */}
        <View style={[styles.dropdownWrapper, { zIndex: 4 }]}>
          <Text style={styles.label}>Date Format</Text>
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

        {/* Time Format Selection */}
        <View style={[styles.dropdownWrapper, { zIndex: 3 }]}>
          <Text style={styles.label}>Time Format</Text>
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

        {/* Primary Time Zone Selection */}
        <View style={[styles.dropdownWrapper, { zIndex: 2 }]}>
          <Text style={styles.label}>Primary Time Zone</Text>
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

        {/* Save Changes Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 15,
  },
  dropdownWrapper: {
    marginBottom: 15,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
  },
});

export default SettingsScreen;
