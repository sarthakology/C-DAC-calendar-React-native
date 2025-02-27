import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import API_URLS from '../../ApiUrls';
import { useTranslation } from 'react-i18next';

export default function DeleteUsersAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URLS.GET_ROLE);
        setUsers(response.data);
      } catch (error) {
        Alert.alert(t('Error'), t('Failed to fetch users.'));
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [t]);

  const handleDelete = (email) => {
    Alert.alert(
      t('Delete User'),
      t('Are you sure you want to delete {{email}}?', { email }),
      [
        {
          text: t('Cancel'),
          style: 'cancel',
        },
        {
          text: t('Delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(API_URLS.DELETE_USER(email));
              setUsers(users.filter((user) => user.email !== email));
              Alert.alert(t('Success'), t('{{email}} has been deleted.', { email }));
            } catch (error) {
              Alert.alert(t('Error'), t('Failed to delete user {{email}}', { email }));
            }
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
        <Text style={styles.deleteButtonText}>{t('Delete')}</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.header}>{t('Loading...')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>{t('Manage User Deletion')}</Text>
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
