import React, { useState } from 'react';
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

const LanguagesAdmin = () => {
  const [languages, setLanguages] = useState([
    { id: '1', language: 'English' },
    { id: '2', language: 'Spanish' },
    { id: '3', language: 'French' },
  ]);
  const [newLanguage, setNewLanguage] = useState('');

  const handleLanguageChange = (index, updatedLanguage) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].language = updatedLanguage;
    setLanguages(updatedLanguages);
  };

  const handleAddLanguage = () => {
    if (!newLanguage.trim()) {
      Alert.alert('Error', 'Language cannot be empty!');
      return;
    }

    if (languages.some((lang) => lang.language === newLanguage)) {
      Alert.alert('Error', 'Language already exists!');
      return;
    }

    const newId = (languages.length + 1).toString();
    setLanguages([...languages, { id: newId, language: newLanguage }]);
    setNewLanguage('');
    Alert.alert('Success', 'Language added successfully!');
  };

  const handleDeleteLanguage = (id) => {
    setLanguages(languages.filter((language) => language.id !== id));
    Alert.alert('Success', 'Language deleted successfully!');
  };

  const handleSubmit = () => {
    Alert.alert('Success', 'All languages updated successfully!');
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Edit Languages</Text>
        <FlatList
          data={languages}
          keyExtractor={(item) => item.id}
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
