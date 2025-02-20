import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import API_URLS from '../../ApiUrls';

export default function CountriesAdminScreen() {
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(API_URLS.GET_MASTER_COUNTRIES);
        setCountries(response.data);
      } catch (err) {
        Alert.alert('Error', 'Failed to load countries.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const handleCountryChange = (index, updatedName) => {
    const updatedCountries = [...countries];
    updatedCountries[index].country = updatedName;
    setCountries(updatedCountries);
  };

  const handleAddCountry = async () => {
    if (newCountry.trim()) {
      try {
        const response = await axios.post(API_URLS.CREATE_MASTER_COUNTRIES, { country: newCountry });
        setCountries([...countries, response.data.country]);
        setNewCountry('');
        Alert.alert('Success', 'Country added successfully!');
      } catch (err) {
        Alert.alert('Error', 'Failed to create country.');
      }
    } else {
      Alert.alert('Error', 'Country name cannot be empty!');
    }
  };

  const handleDeleteCountry = async (id) => {
    try {
      await axios.delete(API_URLS.DELETE_MASTER_COUNTRIES(id));
      setCountries(countries.filter((country) => country.id !== id));
      Alert.alert('Success', 'Country deleted successfully!');
    } catch (err) {
      Alert.alert('Error', 'Failed to delete country.');
    }
  };

  const handleUpdateCountry = async (id, updatedCountry) => {
    try {
      await axios.put(API_URLS.UPDATE_MASTER_COUNTRIES(id), { id, country: updatedCountry });
    } catch (err) {
      Alert.alert('Error', 'Failed to update country.');
    }
  };

  const handleSubmit = async () => {
    try {
      for (const country of countries) {
        await handleUpdateCountry(country.id, country.country);
      }
      Alert.alert('Success', 'Countries updated successfully!');
    } catch (err) {
      Alert.alert('Error', 'Failed to update countries.');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Manage Countries</Text>
        <FlatList
          data={countries}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.idText}>{item.id}:</Text>
              <TextInput
                style={styles.input}
                value={item.country}
                onChangeText={(text) => handleCountryChange(index, text)}
              />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteCountry(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />
        <View style={styles.newCountryContainer}>
          <TextInput
            style={styles.input}
            value={newCountry}
            onChangeText={setNewCountry}
            placeholder="Add a new country"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddCountry}>
            <Text style={styles.addButtonText}>Add Country</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  idText: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  newCountryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
