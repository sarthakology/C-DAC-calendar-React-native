import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URLS from '../../ApiUrls';
import GlobalContext from "../../context/GlobalContext";
import refreshJWTToken from '../../services/RefreshJWTToken';
// import { DevSettings } from 'react-native';

export default function LoginScreen({ navigation }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { dispatchCalEvent, dispatchCalTask } = useContext(GlobalContext);


  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }
  
    setLoading(true);
  
    await AsyncStorage.removeItem('savedEvents');
    await AsyncStorage.removeItem('savedTasks');
    dispatchCalEvent({ type: 'deleteAll' });
    dispatchCalTask({ type: 'deleteAll' });
  
    try {
      const response = await fetch(API_URLS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email.toLowerCase(),
          password 
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
  
      // Store tokens in AsyncStorage
      await AsyncStorage.setItem('accessToken', data.accessToken);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);
  
      Alert.alert("Success", "Login successful!");
  
      // Fetch events and tasks
      await fetchAndDispatchEvents();
      await fetchAndDispatchTasks();
  
      // DevSettings.reload(); // 🔄 Reloads the entire app
  
      navigation.goBack(); // Navigate to main screen
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };
  

  const fetchAndDispatchEvents = async () => {
    try {
      const accessToken = await refreshJWTToken();

      if (accessToken) {
        const response = await fetch(API_URLS.GET_USER_EVENTS, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        const savedEvents = await response.json();
        savedEvents.forEach(event => {
          dispatchCalEvent({ type: "push", payload: event });
        });
      }
    } catch (error) {
      console.error('Error fetching user events:', error);
    }
  };

  const fetchAndDispatchTasks = async () => {
    try {
      const accessToken = await refreshJWTToken();

      if (accessToken) {
        const response = await fetch(API_URLS.GET_USER_TASKS, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        const savedTasks = await response.json();
        savedTasks.forEach(task => {
          dispatchCalTask({ type: "push", payload: task });
        });
      }
    } catch (error) {
      console.error('Error fetching user tasks:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://www.cdac.in/img/cdac-logo.png' }} style={styles.logo} />
      <Text style={styles.title}>{t('greeting-back')}</Text>
      <Text style={styles.subtitle}>{t('Please log in to your account')}</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('Email')}</Text>
        <TextInput
          style={styles.input}
          placeholder="name@company.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('Password')}</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{t('Login')}</Text>}
      </TouchableOpacity>

      <Text style={styles.footerText}>
        {t("Don't have an account?")}{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
          {t('Sign up here')}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  logo: {
    width: 400,
    height: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#007bff',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  link: {
    color: '#007bff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
