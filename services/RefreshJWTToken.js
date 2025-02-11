import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URLS from '../ApiUrls';

const refreshJWTToken = async (navigation) => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (refreshToken) {
      const response = await axios.post(API_URLS.REFRESH_TOKEN, { refreshToken });

      const newAccessToken = response.data.accessToken;
      await AsyncStorage.setItem('accessToken', newAccessToken);
      console.log("token refreshed")
      return newAccessToken;
    }
  } catch (error) {
    console.error('Error refreshing JWT token:', error);
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    console.log('User logged out');

    if (navigation) {
      navigation.navigate('Login');
    }
    
    throw error;
  }
};

export default refreshJWTToken;
