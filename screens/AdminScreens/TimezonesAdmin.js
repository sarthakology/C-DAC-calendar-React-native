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

const TimezonesAdmin = () => {
  const [timezones, setTimezones] = useState([
    { id: '1', timezone: 'UTC' },
    { id: '2', timezone: 'GMT' },
    { id: '3', timezone: 'EST' },
  ]);
  const [newTimezone, setNewTimezone] = useState('');

  const handleTimezoneChange = (index, updatedTimezone) => {
    const updatedTimezones = [...timezones];
    updatedTimezones[index].timezone = updatedTimezone;
    setTimezones(updatedTimezones);
  };

  const handleAddTimezone = () => {
    if (!newTimezone.trim()) {
      Alert.alert('Error', 'Timezone cannot be empty!');
      return;
    }

    if (timezones.some((tz) => tz.timezone === newTimezone)) {
      Alert.alert('Error', 'Timezone already exists!');
      return;
    }

    const newId = (timezones.length + 1).toString();
    setTimezones([...timezones, { id: newId, timezone: newTimezone }]);
    setNewTimezone('');
    Alert.alert('Success', 'Timezone added successfully!');
  };

  const handleDeleteTimezone = (id) => {
    setTimezones(timezones.filter((timezone) => timezone.id !== id));
    Alert.alert('Success', 'Timezone deleted successfully!');
  };

  const handleSubmit = () => {
    Alert.alert('Success', 'All timezones updated successfully!');
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.idText}>{item.id}:</Text>
      <TextInput
        style={styles.input}
        value={item.timezone}
        onChangeText={(text) => handleTimezoneChange(index, text)}
      />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteTimezone(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Edit Timezones</Text>
        <FlatList
          data={timezones}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
        <View style={styles.newTimezoneContainer}>
          <TextInput
            style={styles.input}
            value={newTimezone}
            onChangeText={setNewTimezone}
            placeholder="Enter new timezone"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddTimezone}
          >
            <Text style={styles.addButtonText}>Add Timezone</Text>
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
  newTimezoneContainer: {
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

export default TimezonesAdmin;
