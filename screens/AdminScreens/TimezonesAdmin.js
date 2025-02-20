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

const TimezonesAdmin = () => {
  const [timezones, setTimezones] = useState([]);
  const [newTimezone, setNewTimezone] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchTimezones = async () => {
      try {
        const response = await axios.get(API_URLS.GET_MASTER_TIMEZONE);
        setTimezones(response.data);
      } catch (err) {
        Alert.alert('Error', 'Failed to load timezones.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTimezones();
  }, []);

  const handleTimezoneChange = (index, updatedTimezone) => {
    const updatedTimezones = [...timezones];
    updatedTimezones[index].timezone = updatedTimezone;
    setTimezones(updatedTimezones);
  };

  const handleAddTimezone = async () => {
    if (!newTimezone.trim()) {
      Alert.alert('Error', 'Timezone cannot be empty!');
      return;
    }

    if (timezones.some((tz) => tz.timezone === newTimezone)) {
      Alert.alert('Error', 'Timezone already exists!');
      return;
    }

    try {
      setActionLoading(true);
      const response = await axios.post(API_URLS.CREATE_MASTER_TIMEZONE, { timezone: newTimezone });
      setTimezones([...timezones, response.data.timezone]);
      setNewTimezone('');
      Alert.alert('Success', 'Timezone added successfully!');
    } catch (err) {
      Alert.alert('Error', 'Failed to create timezone.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTimezone = async (id) => {
    try {
      setActionLoading(true);
      await axios.delete(API_URLS.DELETE_MASTER_TIMEZONE(id));
      setTimezones(timezones.filter((timezone) => timezone.id !== id));
      Alert.alert('Success', 'Timezone deleted successfully!');
    } catch (err) {
      Alert.alert('Error', 'Failed to delete timezone.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      for (const timezone of timezones) {
        await axios.put(API_URLS.UPDATE_MASTER_TIMEZONE(timezone.id), { id: timezone.id, timezone: timezone.timezone });
      }
      Alert.alert('Success', 'All timezones updated successfully!');
    } catch (err) {
      Alert.alert('Error', 'Failed to update timezones.');
    }
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
        disabled={actionLoading}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Edit Timezones</Text>
        <FlatList
          data={timezones}
          keyExtractor={(item) => item.id.toString()}
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
            disabled={actionLoading}
          >
            <Text style={styles.addButtonText}>Add Timezone</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSubmit}
          disabled={actionLoading}
        >
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
  newTimezoneContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  addButton: { backgroundColor: '#4caf50', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  saveButton: { backgroundColor: '#007bff', paddingVertical: 15, borderRadius: 8, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default TimezonesAdmin;
