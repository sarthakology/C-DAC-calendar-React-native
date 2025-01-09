import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import userData from '../userDataBackend/userData'; // Adjust the path as necessary

export default function ListScreen() {
  const { savedEvents, savedTasks } = userData;

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Events</Text>
      {savedEvents.map((event) => (
        <View
          key={event.id}
          style={[styles.card, { backgroundColor: getLabelColor(event.label) }]}
        >
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.description}>{event.description}</Text>
          <Text style={styles.label}>Label: {event.label}</Text>
          <Text style={styles.day}>Day: {new Date(event.day).toDateString()}</Text>
        </View>
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
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:60,
    padding: 16,
    backgroundColor: '#f8f9fa',
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
    borderRadius: 8, // Rounded corners for all cards
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskCard: {
    borderWidth: 1, // Border for tasks
    borderColor: '#ccc',
    borderRadius: 12, // More rounded corners for tasks
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
