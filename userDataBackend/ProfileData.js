import { useState, useEffect } from 'react';
import axios from 'axios';
import refreshJWTToken from '../services/RefreshJWTToken';
import API_URLS from '../ApiUrls';

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = await refreshJWTToken();
        
        if (accessToken) {
          const response = await axios.get(API_URLS.GET_USER_PROFILE, {
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            },
          });
          setProfile(response.data);

        }
      } catch (error) {
        
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserProfile();
  }, []);
  return profile;
};

export default useProfile;