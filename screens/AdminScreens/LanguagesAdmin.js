import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import axios from 'axios';
import API_URLS from '../../ApiUrls';

const LanguagesAdmin = () => {
  const [languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(API_URLS.GET_MASTER_LANGUAGE);
        setLanguages(response.data);
      } catch (err) {
        Alert.alert('Error', 'Failed to load languages.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchLanguages();
  }, []);

  const handleLanguageChange = (index, updatedLanguage) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].language = updatedLanguage;
    setLanguages(updatedLanguages);
  };

  const handleAddLanguage = async () => {
    if (!newLanguage.trim()) {
      Alert.alert('Error', 'Language cannot be empty!');
      return;
    }
    try {
      const response = await axios.post(API_URLS.CREATE_MASTER_LANGUAGE, { language: newLanguage });
      setLanguages([...languages, response.data.language]);
      setNewLanguage('');
      Alert.alert('Success', 'Language added successfully!');
    } catch (err) {
      Alert.alert('Error', 'Failed to create language.');
    }
  };

  const handleDeleteLanguage = async (id) => {
    try {
      await axios.delete(API_URLS.DELETE_MASTER_LANGUAGE(id));
      setLanguages(languages.filter((language) => language.id !== id));
      Alert.alert('Success', 'Language deleted successfully!');
    } catch (err) {
      Alert.alert('Error', 'Failed to delete language.');
    }
  };

  const handleUpdateLanguage = async (id, updatedLanguage) => {
    try {
      await axios.put(API_URLS.UPDATE_MASTER_LANGUAGE(id), { id, language: updatedLanguage });
    } catch (err) {
      Alert.alert('Error', 'Failed to update language.');
    }
  };

  const handleSubmit = async () => {
    try {
      for (const language of languages) {
        await handleUpdateLanguage(language.id, language.language);
      }
      Alert.alert('Success', 'All languages updated successfully!');
    } catch (err) {
      Alert.alert('Error', 'Failed to update languages.');
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.idText}>{item.id}:</Text>
      <TextInput
        style={styles.input}
        value={item.language}
        onChangeText={(text) => handleLanguageChange(index, text)}
      />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteLanguage(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
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
        <Text style={styles.header}>Edit Languages</Text>
        <FlatList
          data={languages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
        <View style={styles.newLanguageContainer}>
          <TextInput
            style={styles.input}
            value={newLanguage}
            onChangeText={setNewLanguage}
            placeholder="Enter new language"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddLanguage}
          >
            <Text style={styles.addButtonText}>Add Language</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSubmit}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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
  newLanguageContainer: {
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

export default LanguagesAdmin;