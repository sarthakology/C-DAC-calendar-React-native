import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

export default function AdminPanelScreen({ navigation }) {
  const { t } = useTranslation();
  const options = [
    { id: '1', label: t('Languages'), onPress: () => navigation.navigate('languages') },
    { id: '2', label: t('countries'), onPress: () => navigation.navigate('countries') },
    { id: '3', label: t('timezones'), onPress: () => navigation.navigate('timezones') },
    { id: '4', label: t('formats'), onPress: () => navigation.navigate('formats') },
    { id: '5', label: t('role Update'), onPress: () => navigation.navigate('roleUpdate') },
    { id: '6', label: t('delete Users'), onPress: () => navigation.navigate('deleteUsers') },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.optionButton} onPress={item.onPress}>
      <Text style={styles.optionText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>{t('Admin Panel')}</Text>
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
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  optionText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});
