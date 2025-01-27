import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import userData from '../../userDataBackend/userData'; // Adjust the path as necessary
import GlobalContext from "../../context/GlobalContext";

export default function ListScreen() {
  const { savedTasks } = userData;
  const { savedEvents, setDaySelected, setSelectedEvent, setShowEventModal } = useContext(GlobalContext);

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

  const handleEventPress = (event) => {
    setDaySelected(new Date(event.day))
    setSelectedEvent(event)
    setShowEventModal(true)
    // console.log('Event Pressed:', event);
    // console.log('Event Date:', new Date(event.day)); // Logs the event date
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Events</Text>
        {savedEvents.map((event) => (
          <TouchableOpacity key={event.id} onPress={() => handleEventPress(event)}>
            <View
              style={[styles.card, { backgroundColor: getLabelColor(event.label) }]}
            >
              <Text style={styles.title}>{event.title}</Text>
              <Text style={styles.description}>{event.description}</Text>
              <Text style={styles.label}>Label: {event.label}</Text>
              <Text style={styles.day}>Day: {new Date(event.day).toDateString()}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.header}>Tasks</Text>
        {savedTasks.map((task) => (
          <View key={task.id} style={[styles.card, styles.taskCard]}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.description}>{task.description}</Text>
            <Text style={styles.date}>Date: {task.date}</Text>
            <Text style={styles.time}>
              Time: {task.startTime} - {task.endTime}
            </Text>
            <Text style={styles.reminder}>Reminder: {task.reminder}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  label: {
    fontSize: 14,
    color: '#777',
  },
  day: {
    fontSize: 14,
    color: '#777',
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  time: {
    fontSize: 14,
    color: '#555',
  },
  reminder: {
    fontSize: 14,
    color: '#777',
  },
});