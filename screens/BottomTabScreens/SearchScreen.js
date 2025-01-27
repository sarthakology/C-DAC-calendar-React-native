import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Demo data for search result
  const data = {
    credentials: {
      profilePicture:
        'https://firebasestorage.googleapis.com/v0/b/fir-44d31.appspot.com/o/images%2Fsample1.jpgca9a9b72-3770-49e6-8281-7ae5e6f657d3?alt=media&token=2f514c54-2925-46bd-8721-9f47051657e3',
      name: 'Antony',
      email: 'a@a.a',
      role: 'User',
    },
    savedEvents: [
      {
        title: 'meeting',
        description: 'meeting with client',
        label: 'green',
        day: 1736188200000,
        id: 1736162142644,
        guests: [],
      },
      {
        title: 'dinner',
        description: 'dinner with jack',
        label: 'purple',
        day: 1736793000000,
        id: 1736162161460,
        guests: [],
      },
      {
        title: 'trip',
        description: 'trip to dubai',
        label: 'gray',
        day: 1736274600000,
        id: 1736162179727,
        guests: [],
      },
    ],
    savedTasks: [
      {
        id: 1736162215694,
        title: 'gym',
        date: '2025-01-07',
        startTime: '15:00',
        endTime: '16:00',
        duration: 'timed',
        description: 'gym gym gym',
        reminder: '15:00',
        completed: false,
      },
      {
        id: 1736162237027,
        title: 'party',
        date: '2025-01-06',
        startTime: '22:00',
        endTime: '23:00',
        duration: 'timed',
        description: 'party party',
        reminder: 'No',
        completed: false,
      },
    ],
  };

  const [checkedEvents, setCheckedEvents] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState([]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert('Please enter a search term');
      return;
    }
    setIsSearching(true); // Show the result screen
  };

  const handleEventSelection = (event) => {
    if (checkedEvents.includes(event)) {
      setCheckedEvents(checkedEvents.filter((e) => e !== event));
    } else {
      setCheckedEvents([...checkedEvents, event]);
    }
  };

  const handleTaskSelection = (task) => {
    if (checkedTasks.includes(task)) {
      setCheckedTasks(checkedTasks.filter((t) => t !== task));
    } else {
      setCheckedTasks([...checkedTasks, task]);
    }
  };

  const logCheckedEvents = () => {
    console.log('Selected Events:', checkedEvents);
  };

  const logCheckedTasks = () => {
    console.log('Selected Tasks:', checkedTasks);
  };

  const getLabelColor = (label) => {
    const colors = {
      indigo: 'rgba(75, 0, 130, 0.2)',
      gray: 'rgba(128, 128, 128, 0.2)',
      green: 'rgba(0, 128, 0, 0.2)',
      blue: 'rgba(0, 0, 255, 0.2)',
      red: 'rgba(255, 0, 0, 0.2)',
      purple: 'rgba(128, 0, 128, 0.2)',
    };
    return colors[label] || 'rgba(0, 0, 0, 0.1)'; // Default light gray for unknown labels
  };

  if (!isSearching) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.heading}>Search for a User</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>User Details</Text>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: data.credentials.profilePicture }}
            style={styles.profilePicture}
          />
          <Text style={styles.text}>
            <Text style={styles.bold}>Name:</Text> {data.credentials.name}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Email:</Text> {data.credentials.email}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Role:</Text> {data.credentials.role}
          </Text>
        </View>

        {/* Events Section */}
        <Text style={styles.sectionHeading}>Saved Events</Text>
        <FlatList
          data={data.savedEvents}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const isSelected = checkedEvents.includes(item);
            return (
              <TouchableOpacity
                style={[
                  styles.listItem,
                  { backgroundColor: getLabelColor(item.label) },
                  isSelected && styles.selectedItem,
                ]}
                onPress={() => handleEventSelection(item)}
              >
                <Text style={styles.text}>
                  <Text style={styles.bold}>Title:</Text> {item.title}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.bold}>Label:</Text> {item.label}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.bold}>Day:</Text>{' '}
                  {new Date(item.day).toDateString()}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <TouchableOpacity style={styles.button} onPress={logCheckedEvents}>
          <Text style={styles.buttonText}>Add Events to Your Account</Text>
        </TouchableOpacity>

        {/* Tasks Section */}
        <Text style={styles.sectionHeading}>Saved Tasks</Text>
        <FlatList
          data={data.savedTasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const isSelected = checkedTasks.includes(item);
            return (
              <TouchableOpacity
                style={[styles.listItem, isSelected && styles.selectedItem]}
                onPress={() => handleTaskSelection(item)}
              >
                <Text style={styles.text}>
                  <Text style={styles.bold}>Title:</Text> {item.title}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.bold}>Date:</Text>{' '}
                  {new Date(item.date).toDateString()}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.bold}>Start Time:</Text> {item.startTime}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.bold}>End Time:</Text> {item.endTime}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <TouchableOpacity style={styles.button} onPress={logCheckedTasks}>
          <Text style={styles.buttonText}>Add Tasks to Your Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  listItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedItem: {
    borderColor: '#007BFF',
    borderWidth: 2,
  },
});
