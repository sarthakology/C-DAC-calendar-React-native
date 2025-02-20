import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, ActivityIndicator, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import API_URLS from '../../ApiUrls';

export default function RoleUpdateAdmin() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URLS.GET_ROLE);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        Alert.alert('Error', 'Failed to fetch users.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (email, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin'; // Toggle between admin and user
    try {
      await axios.put(API_URLS.UPDATE_ROLE, {
        email,
        role: newRole,
      });
      setUsers(users.map((user) =>
        user.email === email ? { ...user, role: newRole } : user
      ));
      Alert.alert('Success', `Role updated for ${email}`);
    } catch (error) {
      console.error('Error updating role:', error);
      Alert.alert('Error', 'Failed to update role.');
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
          Manage User Roles
        </Text>
        
        {/* Users List */}
        {users.map((user) => (
          <View key={user.email} style={styles.userContainer}>
            <View>
              <Text>Email: {user.email}</Text>
              <Text>Current Role: {user.role}</Text>
            </View>
            <Button 
              title={user.role === 'admin' ? 'Demote' : 'Promote'}
              onPress={() => handleRoleChange(user.email, user.role)}
              style={styles.button}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'flex-end', // Align button to the right
  },
});
