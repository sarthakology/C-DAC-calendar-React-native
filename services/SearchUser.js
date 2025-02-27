import axios from 'axios';
import API_URLS from '../ApiUrls';

const searchUserByEmail = async (email) => {
  try {
    const response = await axios.get(API_URLS.SEARCH_USER_PROFILE(email.toLowerCase()));
    return response.data; // Return the fetched user data
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('User not found');
  }
};

export default searchUserByEmail;