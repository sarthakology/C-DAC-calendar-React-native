import React, { useState } from 'react';
import { View, Text, Button, Alert, ActivityIndicator, SafeAreaView, ScrollView, StyleSheet } from 'react-native';

export default function RoleUpdateAdmin() {
  const [users, setUsers] = useState([
    { email: 'user1@example.com', role: 'user' },
    { email: 'user2@example.com', role: 'admin' },
    { email: 'user3@example.com', role: 'user' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = (email, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin'; // Toggle between admin and user
    Alert.alert(
      'Confirm Role Change',
      `Are you sure you want to ${newRole === 'admin' ? 'promote' : 'demote'} this user to ${newRole}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            setIsLoading(true);
            // Simulate API call with a timeout
            setTimeout(() => {
              setUsers(users.map((user) =>
                user.email === email ? { ...user, role: newRole } : user
              ));
              setIsLoading(false);
            }, 1000);
          },
        },
      ]
    );
  };


  const admins = users.filter(user => user.role === 'admin');
  const regularUsers = users.filter(user => user.role === 'user');

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
        
        {/* Admins List */}
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Admins</Text>
        {admins.length === 0 ? (
          <Text>No admins available</Text>
        ) : (
          admins.map((user) => (
            <View key={user.email} style={styles.userContainer}>
              <View>
                <Text>Email: {user.email}</Text>
                <Text>Current Role: {user.role}</Text>
              </View>
              <Button 
                title="Demote"
                onPress={() => handleRoleChange(user.email, user.role)}
                style={styles.button}
              />
            </View>
          ))
        )}

        {/* Users List */}
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Users</Text>
        {regularUsers.length === 0 ? (
          <Text>No users available</Text>
        ) : (
          regularUsers.map((user) => (
            <View key={user.email} style={styles.userContainer}>
              <View>
                <Text>Email: {user.email}</Text>
                <Text>Current Role: {user.role}</Text>
              </View>
              <Button 
                title="Promote"
                onPress={() => handleRoleChange(user.email, user.role)}
                style={styles.button}
              />
            </View>
          ))
        )}
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
