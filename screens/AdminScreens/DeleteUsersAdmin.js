import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function DeleteUsersAdmin() {
  const [users, setUsers] = useState([
    { email: 'user1@example.com' },
    { email: 'user2@example.com' },
    { email: 'user3@example.com' },
  ]);

  const handleDelete = (email) => {
    Alert.alert(
      'Delete User',
      `Are you sure you want to delete ${email}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setUsers(users.filter((user) => user.email !== email));
            Alert.alert('Success', `${email} has been deleted.`);
          },
        },
      ]
    );
  };

  const renderUser = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.emailText}>{item.email}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.email)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Manage User Deletion</Text>
        <FlatList
          data={users}
          keyExtractor={(item) => item.email}
          renderItem={renderUser}
          contentContainerStyle={styles.listContainer}
        />
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
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  emailText: {
    fontSize: 16,
    color: '#333',
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
});
