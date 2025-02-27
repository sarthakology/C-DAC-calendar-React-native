import React, { useState, useContext, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import searchUserByEmail from '../../services/SearchUser';
import GlobalContext from "../../context/GlobalContext"; 
import useProfile from '../../userDataBackend/ProfileData';
import { useTranslation } from 'react-i18next'; // Import translation hook

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [data, setData] = useState(null);

  const [checkedEvents, setCheckedEvents] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState([]);

  const { dispatchCalEvent, dispatchCalTask } = useContext(GlobalContext);

  const profileData = useProfile();

  const profile = useMemo(() => profileData || {
    name: "N/A",
    gender: "N/A",
    role: "N/A",
    phno: "N/A",
    email: "N/A",
    profilePicture: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
    accountStatus: "Public"
  }, [profileData]);

  const { t } = useTranslation(); // Initialize the translation hook

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert(t('Please enter a search term')); // Translated alert
      return;
    }

    try {
      const userData = await searchUserByEmail(searchTerm);
      setData(userData);
      setIsSearching(true);
    } catch (error) {
      alert(error.message);
      setData(null);
    }
  };

  const handleEventSelection = (event) => {
    setCheckedEvents((prev) =>
      prev.includes(event) ? prev.filter((e) => e !== event) : [...prev, event]
    );
  };

  const handleTaskSelection = (task) => {
    setCheckedTasks((prev) =>
      prev.includes(task) ? prev.filter((t) => t !== task) : [...prev, task]
    );
  };

  const logCheckedEvents = () => {
    checkedEvents.forEach(event => {
      dispatchCalEvent({ type: "push", payload: event });
    });
    setCheckedEvents([]);
  };

  const logCheckedTasks = () => {
    checkedTasks.forEach(task => {
      dispatchCalTask({ type: "push", payload: task });
    });
    setCheckedTasks([]);
  };

  const handleBack = () => {
    setIsSearching(false);
    setSearchTerm("");
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
    return colors[label] || 'rgba(0, 0, 0, 0.1)';
  };

  if (!isSearching) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.heading}>{t('Search for a User')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('Enter email')}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Text style={styles.buttonText}>{t('Search')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.buttonText}>{t('Back')}</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>{t('User Details')}</Text>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: data.credentials.profilePicture }}
            style={styles.profilePicture}
          />
          <Text style={styles.text}><Text style={styles.bold}>{t('Name')}:</Text> {data.credentials.name}</Text>
          <Text style={styles.text}><Text style={styles.bold}>{t('Email')}:</Text> {data.credentials.email}</Text>
          <Text style={styles.text}><Text style={styles.bold}>{t('Role')}:</Text> {data.credentials.role}</Text>
        </View>

        <Text style={styles.sectionHeading}>{t('Saved Events')}</Text>
        {data.savedEvents?.length === 0 ? (
          <Text style={styles.noDataText}>{t('No events to display')}</Text>
        ) : (
          data.savedEvents?.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.listItem,
                { backgroundColor: getLabelColor(item.label) },
                checkedEvents.includes(item) && styles.selectedItem,
              ]}
              onPress={() => handleEventSelection(item)}
            >
              <Text style={styles.text}><Text style={styles.bold}>{t('Title')}:</Text> {item.title}</Text>
              <Text style={styles.text}><Text style={styles.bold}>{t('Label')}:</Text> {item.label}</Text>
              <Text style={styles.text}><Text style={styles.bold}>{t('Day')}:</Text> {new Date(item.day).toDateString()}</Text>
            </TouchableOpacity>
          ))
        )}

        {checkedEvents.length > 0 && (
          <TouchableOpacity style={styles.button} onPress={logCheckedEvents}>
            <Text style={styles.buttonText}>{t('Add Events to Your Account')}</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.sectionHeading}>{t('Saved Tasks')}</Text>
        {data.savedTasks?.length === 0 ? (
          <Text style={styles.noDataText}>{t('No tasks to display')}</Text>
        ) : (
          data.savedTasks?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.listItem, checkedTasks.includes(item) && styles.selectedItem]}
              onPress={() => handleTaskSelection(item)}
            >
              <Text style={styles.text}><Text style={styles.bold}>{t('Title')}:</Text> {item.title}</Text>
              <Text style={styles.text}><Text style={styles.bold}>{t('Date')}:</Text> {new Date(item.date).toDateString()}</Text>
              <Text style={styles.text}><Text style={styles.bold}>{t('Start Time')}:</Text> {item.startTime}</Text>
              <Text style={styles.text}><Text style={styles.bold}>{t('End Time')}:</Text> {item.endTime}</Text>
            </TouchableOpacity>
          ))
        )}

        {checkedTasks.length > 0 && (
          <TouchableOpacity style={styles.button} onPress={logCheckedTasks}>
            <Text style={styles.buttonText}>{t('Add Tasks to Your Account')}</Text>
          </TouchableOpacity>
        )}
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
  backButton: {
    padding: 10,
  },
  noDataText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
});
