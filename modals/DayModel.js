import React, { useContext } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons
import GlobalContext from "../context/GlobalContext";
import { useTranslation } from 'react-i18next'; // Import translation hook

// Function to get background color based on label
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

const DayModal = ({ isVisible, onClose, selectedDay, events }) => {
  const { setSelectedEvent, setShowEventModal, setShowTaskModal } = useContext(GlobalContext);
  const { t } = useTranslation(); // Initialize the translation hook

  // Function to handle event card click
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleCreateEvent = () => {
    setShowEventModal(true);
  };

  const handleCreateTask = () => {
    setShowTaskModal(true)
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={30} color="#000" />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.modalTitle}>{selectedDay}</Text>

          {/* Event List Section */}
          <View style={styles.eventSection}>
            <Text style={styles.eventSectionTitle}>{t('events')}</Text>
            <View style={styles.eventList}>
              {events.length > 0 ? (
                events.map((event, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.eventContainer, { backgroundColor: getLabelColor(event.label) }]}
                    onPress={() => handleEventClick(event)}
                  >
                    <View style={styles.eventContent}>
                      <View style={styles.eventTextContainer}>
                        <Text style={styles.eventTitle}>{event.title}</Text>
                        <Text style={styles.eventDetails}>{event.description}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noEvents}>{t('noEvents')}</Text>
              )}
            </View>
          </View>

          {/* Buttons for Create Event and Create Task */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
              <Text style={styles.buttonText}>{t('createEvent')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCreateTask}>
              <Text style={styles.buttonText}>{t('createTask')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    position: "relative", // Ensure close button is positioned relative to modal content
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 20,
    color: "#333",
  },
  eventSection: {
    width: "100%",
    marginBottom: 20,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: "#f2f2f2",
    paddingBottom: 10,
  },
  eventSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginBottom: 10,
  },
  eventList: {
    width: "100%",
  },
  eventContainer: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    position: "relative", // Allow content to position correctly
  },
  eventContent: {
    flexDirection: "row", // Align title and description horizontally
    alignItems: "center", // Vertically center the content
  },
  eventTextContainer: {
    flex: 1, // Allow title and description to take available space
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  eventDetails: {
    fontSize: 14,
    color: "#666",
  },
  noEvents: {
    fontSize: 16,
    color: "#888",
    marginVertical: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fff", // White background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30, // Making it rounded
    borderWidth: 1, // Border thickness
    borderColor: "#ccc", // Grey border color
    flex: 1,
    marginHorizontal: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#000", // Black text color
    fontWeight: "bold",
  },
});

export default DayModal;
