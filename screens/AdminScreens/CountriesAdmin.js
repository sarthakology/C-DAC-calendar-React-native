import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CountriesAdminScreen() {
  const [countries, setCountries] = useState([
    { id: '1', name: 'India' },
    { id: '2', name: 'USA' },
    { id: '3', name: 'Canada' },
  ]);
  const [newCountry, setNewCountry] = useState('');

  const handleCountryChange = (index, updatedName) => {
    const updatedCountries = [...countries];
    updatedCountries[index].name = updatedName;
    setCountries(updatedCountries);
  };

  const handleAddCountry = () => {
    if (newCountry.trim()) {
      const newId = (countries.length + 1).toString();
      setCountries([...countries, { id: newId, name: newCountry }]);
      setNewCountry('');
      Alert.alert('Success', 'Country added successfully!');
    } else {
      Alert.alert('Error', 'Country name cannot be empty!');
    }
  };

  const handleDeleteCountry = (id) => {
    setCountries(countries.filter((country) => country.id !== id));
    Alert.alert('Success', 'Country deleted successfully!');
  };

  const handleSubmit = () => {
    Alert.alert('Success', 'Countries updated successfully!');
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.idText}>{item.id}:</Text>
      <TextInput
        style={styles.input}
        value={item.name}
        onChangeText={(text) => handleCountryChange(index, text)}
      />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteCountry(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Manage Countries</Text>
        <FlatList
          data={countries}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
        <View style={styles.newCountryContainer}>
          <TextInput
            style={styles.input}
            value={newCountry}
            onChangeText={setNewCountry}
            placeholder="Add a new country"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddCountry}
          >
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
});
