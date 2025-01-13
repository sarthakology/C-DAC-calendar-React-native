import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import React from 'react';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.text}>Home Screen</Text>
        <TouchableOpacity 
          style={styles.profileButton} 
          onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/fir-44d31.appspot.com/o/images%2Fsample1.jpgca9a9b72-3770-49e6-8281-7ae5e6f657d3?alt=media&token=2f514c54-2925-46bd-8721-9f47051657e3',
            }}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Matches the background color of your container
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
  profileButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 50,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
