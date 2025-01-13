import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function CreateEventScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLabel, setSelectedLabel] = useState(labelsClasses[0]);
  const [guestEmails, setGuestEmails] = useState([""]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  function handleGuestChange(index, value) {
    const updatedGuests = [...guestEmails];
    updatedGuests[index] = value;
    setGuestEmails(updatedGuests);
  }

  function addGuestField() {
    setGuestEmails([...guestEmails, ""]);
  }

  function removeGuestField(index) {
    setGuestEmails(guestEmails.filter((_, i) => i !== index));
  }

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  function handleSubmit() {
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: selectedDate.getTime(),
      id: Date.now(),
      guests: guestEmails.filter((email) => email !== "").map((email) => ({ email })),
    };
    console.log(calendarEvent);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Create New Event</Text>

        <View style={styles.datePickerContainer}>
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onDateChange}
            style={styles.dateTimePicker}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Event Title"
          value={title}
          onChangeText={setTitle}
        />
        <TouchableOpacity onPress={showDatePickerModal} style={styles.datePickerButton}>
          <Text style={styles.datePickerText}>
            {selectedDate.toDateString()}
          </Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Event Description"
          value={description}
          onChangeText={setDescription}
        />

        <View style={styles.labelContainer}>
          {labelsClasses.map((lblClass, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.labelButton, { backgroundColor: lblClass }]}
              onPress={() => setSelectedLabel(lblClass)}
            >
              {selectedLabel === lblClass && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Add Guest Emails</Text>
        {guestEmails.map((email, index) => (
          <View key={index} style={styles.guestContainer}>
            <TextInput
              style={styles.input}
              placeholder="Guest Email"
              value={email}
              onChangeText={(value) => handleGuestChange(index, value)}
            />
            <TouchableOpacity
              onPress={() => removeGuestField(index)}
              style={styles.removeButton}
            >
              <Text style={styles.removeText}>x</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity onPress={addGuestField} style={styles.addButton}>
          <Text style={styles.addText}>Add Guest</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Event</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  datePickerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  datePickerButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
  },
  dateTimePicker: {
    width: '100%',
    backgroundColor: '#ffffff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  labelButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  checkmark: {
    color: '#fff',
    fontSize: 18,
  },
  guestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
    marginLeft: 10,
    marginBottom: 10,
  },
  removeText: {
    color: '#ff4d4d',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'black',
    alignItems: 'center',
    width: 100,
  },
  addText: {
    color: '#000000',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'black',
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#000000',
    fontSize: 18,
  },
});
