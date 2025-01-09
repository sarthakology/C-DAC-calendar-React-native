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

const FormatsAdmin = () => {
  const [formats, setFormats] = useState([
    { id: '1', format: 'DD-MM-YYYY' },
    { id: '2', format: 'MM-DD-YYYY' },
    { id: '3', format: 'YYYY-MM-DD' },
  ]);
  const [newFormat, setNewFormat] = useState('');

  const handleFormatChange = (index, updatedFormat) => {
    const updatedFormats = [...formats];
    updatedFormats[index].format = updatedFormat;
    setFormats(updatedFormats);
  };

  const handleAddFormat = () => {
    if (!newFormat.trim()) {
      Alert.alert('Error', 'Format cannot be empty!');
      return;
    }

    if (formats.some(f => f.format === newFormat)) {
      Alert.alert('Error', 'Format already exists!');
      return;
    }

    const newId = (formats.length + 1).toString();
    setFormats([...formats, { id: newId, format: newFormat }]);
    setNewFormat('');
    Alert.alert('Success', 'Format added successfully!');
  };

  const handleDeleteFormat = (id) => {
    setFormats(formats.filter((format) => format.id !== id));
    Alert.alert('Success', 'Format deleted successfully!');
  };

  const handleSubmit = () => {
    Alert.alert('Success', 'All formats updated successfully!');
  };

  const renderItem = ({ item, index }) => (
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
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Edit Formats</Text>
        <FlatList
          data={formats}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
        <View style={styles.newFormatContainer}>
          <TextInput
            style={styles.input}
            value={newFormat}
            onChangeText={setNewFormat}
            placeholder="Enter new format"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddFormat}
          >
            <Text style={styles.addButtonText}>Add Format</Text>
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
  newFormatContainer: {
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

export default FormatsAdmin;
