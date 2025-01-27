import React, { useState, useContext } from "react";
import {
  Modal,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import GlobalContext from "../context/GlobalContext";
import { Alert } from "react-native";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModel() {
  const { selectedEvent, setSelectedEvent, setShowEventModal, dispatchCalEvent, daySelected } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent?.title || "");
  const [description, setDescription] = useState(selectedEvent?.description || "");
  const [selectedLabel, setSelectedLabel] = useState(selectedEvent?.label || labelsClasses[0]);
  const [guestEmails, setGuestEmails] = useState(
    selectedEvent?.guests?.map((guest) => guest.email) || [""]
  );

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

  const formatDate = (date) => {
    return new Date(date).toDateString();
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert(
        "Missing Title",
        "Please enter a title for the event.",
        [
          {
            text: "OK",
            style: "cancel", // Styling for iOS
          },
        ],
        { cancelable: true } // User can dismiss by tapping outside the alert
      );
      return; // Stop further execution
    }
  
    const calendarEvent = {
      id: selectedEvent?.id || Date.now(),
      title,
      description,
      label: selectedLabel,
      day: daySelected.getTime(),
      guests: guestEmails.filter((email) => email !== "").map((email) => ({ email })),
    };
  
    dispatchCalEvent({ type: selectedEvent ? "update" : "push", payload: calendarEvent });
    setShowEventModal(false);
    setSelectedEvent(null);
  };
  

  const handleDelete = () => {
    if (selectedEvent) {
      Alert.alert(
        "Delete Event", // Title
        "Are you sure you want to delete this event?", // Message
        [
          {
            text: "Cancel",
            style: "cancel", // iOS styling for cancel button
          },
          {
            text: "Delete",
            onPress: () => {
              dispatchCalEvent({ type: "delete", payload: selectedEvent });
              setShowEventModal(false);
              setSelectedEvent(null);
            },
            style: "destructive", // Styling for the delete action
          },
        ],
        { cancelable: true } // User can dismiss by tapping outside the alert
      );
    }
  };

  return (
    <Modal
      visible={true}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setShowEventModal(false)}
    >
      <SafeAreaView style={styles.modalContainer}>

        <ScrollView style={styles.container}>
        <View style={styles.iconContainer}>
          {selectedEvent && (
            <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
              <Ionicons name="trash-outline" size={28} color="red" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => setShowEventModal(false)} style={styles.iconButton}>
            <Ionicons name="close-outline" size={32} color="black" />
          </TouchableOpacity>
        </View>
          <Text style={styles.heading}>
            {selectedEvent ? "Update Event" : "Create New Event"}
          </Text>

          <Text style={styles.dateText}>{formatDate(daySelected)}</Text>

          <TextInput
            style={styles.input}
            placeholder="Event Title"
            value={title}
            onChangeText={setTitle}
          />
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
            <Text style={styles.saveButtonText}>
              {selectedEvent ? "Update Event" : "Save Event"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",

  },
  iconButton: {
    marginLeft: 15,
  },
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    maxHeight: "65%",
  },
  heading: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  labelButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  checkmark: {
    color: "#fff",
    fontSize: 18,
  },
  guestContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  removeButton: {
    marginLeft: 10,
    marginBottom: 10,
  },
  removeText: {
    color: "#ff4d4d",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#ffffff",
    padding: 5,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "black",
    alignItems: "center",
    width: 100,
  },
  addText: {
    color: "#000000",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "black",
    marginTop: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#000000",
    fontSize: 18,
  },
});
