import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
  Linking,
} from 'react-native'; // Added Linking import
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HelpScreen({ navigation }) {
  const options = [
    { id: '1', label: 'Trash', onPress: () => navigation.navigate('trash') },
    {
      id: '2',
      label: 'About us',
      onPress: () => Linking.openURL('https://www.cdac.in/index.aspx?id=about'),
    },
    {
      id: '3',
      label: 'Contact Support',
      onPress: () => Linking.openURL('https://www.cdac.in/index.aspx?id=contact'),
    },
    {
      id: '4',
      label: 'App Version',
      onPress: () => Alert.alert('App Version', 'version 1.0.0'),
    },
    {
      id: '5',
      label: 'Terms & Conditions',
      onPress: () => navigation.navigate('Terms-&-Conditions'),
    },
    {
      id: '6',
      label: 'Send feedback to C-DAC',
      onPress: () => Linking.openURL('https://cdac.in/index.aspx?id=reach_us'),
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.optionButton} onPress={item.onPress}>
      <Text style={styles.optionText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Help & Support</Text>
        <FlatList
          data={options}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
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
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  optionButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});