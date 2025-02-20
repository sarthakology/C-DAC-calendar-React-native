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
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import API_URLS from '../../ApiUrls';

const FormatsAdmin = () => {
  const [formats, setFormats] = useState([]);
  const [newFormat, setNewFormat] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFormats = async () => {
      try {
        const response = await axios.get(API_URLS.GET_MASTER_DATEFORMAT);
        setFormats(response.data);
      } catch (err) {
        Alert.alert('Error', 'Failed to load formats.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchFormats();
  }, []);

  const handleFormatChange = (index, updatedFormat) => {
    const updatedFormats = [...formats];
    updatedFormats[index].format = updatedFormat;
    setFormats(updatedFormats);
  };

  const handleAddFormat = async () => {
    if (!newFormat.trim()) {
      Alert.alert('Error', 'Format cannot be empty!');
      return;
    }
    if (formats.some(f => f.format === newFormat)) {
      Alert.alert('Error', 'Format already exists!');
      return;
    }
    try {
      const response = await axios.post(API_URLS.CREATE_MASTER_DATEFORMAT, { format: newFormat });
      setFormats([...formats, response.data.format]);
      setNewFormat('');
      Alert.alert('Success', 'Format added successfully!');
    } catch (err) {
      Alert.alert('Error', 'Failed to create format.');
    }
  };

  const handleDeleteFormat = async (id) => {
    try {
      await axios.delete(API_URLS.DELETE_MASTER_DATEFORMAT(id));
      setFormats(formats.filter((format) => format.id !== id));
      Alert.alert('Success', 'Format deleted successfully!');
    } catch (err) {
      Alert.alert('Error', 'Failed to delete format.');
    }
  };

  const handleUpdateFormat = async (id, updatedFormat) => {
    try {
      await axios.put(API_URLS.UPDATE_MASTER_DATEFORMAT(id), { id, format: updatedFormat });
    } catch (err) {
      Alert.alert('Error', 'Failed to update format.');
    }
  };

  const handleSubmit = async () => {
    try {
      for (const format of formats) {
        await handleUpdateFormat(format.id, format.format);
      }
      Alert.alert('Success', 'All formats updated successfully!');
    } catch (err) {
      Alert.alert('Error', 'Failed to update formats.');
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
        <Text style={styles.header}>Edit Formats</Text>
        <FlatList
          data={formats}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.idText}>{item.id}:</Text>
              <TextInput
                style={styles.input}
                value={item.format}
                onChangeText={(text) => handleFormatChange(index, text)}
              />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteFormat(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />
        <View style={styles.newFormatContainer}>
          <TextInput
            style={styles.input}
            value={newFormat}
            onChangeText={setNewFormat}
            placeholder="Enter new format"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddFormat}>
            <Text style={styles.addButtonText}>Add Format</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8f9fa' },
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, color: '#333' },
  listContainer: { paddingBottom: 20 },
  itemContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  idText: { fontWeight: 'bold', marginRight: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginRight: 10 },
  deleteButton: { backgroundColor: '#ff4d4d', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8 },
  deleteButtonText: { color: '#fff', fontWeight: 'bold' },
  newFormatContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  addButton: { backgroundColor: '#4caf50', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  saveButton: { backgroundColor: '#007bff', paddingVertical: 15, borderRadius: 8, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default FormatsAdmin;
