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
  Switch,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import GlobalContext from "../context/GlobalContext";
import { useTranslation } from 'react-i18next'; // Import translation hook

export default function TaskModal() {
      const { t } = useTranslation(); // Initialize the translation hook
  
  const { selectedTask, setSelectedTask, setShowTaskModal, dispatchCalTask, daySelected } =
    useContext(GlobalContext);


  const formatDate = (date) => {
    const localDate = new Date(date);
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
    return localDate.toISOString().split("T")[0];
  };

  const [title, setTitle] = useState(selectedTask?.title || "");
  const [description, setDescription] = useState(selectedTask?.description || "");
  const [startTime, setStartTime] = useState(selectedTask?.startTime || ""); 
  const [endTime, setEndTime] = useState(selectedTask?.endTime || "");
  const [allDay, setAllDay] = useState(selectedTask?.startTime === "12:12" && selectedTask?.endTime === "12:12");
  const [reminder, setReminder] = useState(selectedTask?.reminder || "");
  const [completed, setCompleted] = useState(selectedTask?.completed || false);

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert("Missing Title", "Please enter a title for the task.");
      return;
    }

    const formattedStartTime = allDay ? "12:12" : startTime;
    const formattedEndTime = allDay ? "12:12" : endTime;

    const newTask = {
      id: selectedTask?.id || Date.now(),
      title,
      date: formatDate(daySelected),
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      duration: allDay ? "all-day" : "timed",
      description,
      reminder,
      completed,
    };

    dispatchCalTask({ type: selectedTask ? "update" : "push", payload: newTask });
    setShowTaskModal(false);
    setSelectedTask(null);
  };

  const handleDelete = () => {
    if (selectedTask) {
      Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            dispatchCalTask({ type: "delete", payload: selectedTask });
            setShowTaskModal(false);
            setSelectedTask(null);
          },
          style: "destructive",
        },
      ]);
    }
  };

  return (
    <Modal
      visible={true}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setShowTaskModal(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.iconContainer}>
            {selectedTask && (
              <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
                <Ionicons name="trash-outline" size={28} color="red" />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => setShowTaskModal(false)} style={styles.iconButton}>
              <Ionicons name="close-outline" size={32} color="black" />
            </TouchableOpacity>
          </View>

          <Text style={styles.heading}>{selectedTask ? "Update Task" : "Create New Task"}</Text>
          <Text style={styles.dateText}>{formatDate(daySelected)}</Text>

          <TextInput
            style={styles.input}
            placeholder="Task Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Task Description"
            value={description}
            onChangeText={setDescription}
          />

          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>All Day</Text>
            <Switch value={allDay} onValueChange={(value) => {
              setAllDay(value);
              if (value) setReminder("");
            }} />
          </View>

          {!allDay && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Start Time (HH:MM)"
                value={startTime}
                onChangeText={setStartTime}
              />
              <TextInput
                style={styles.input}
                placeholder="End Time (HH:MM)"
                value={endTime}
                onChangeText={setEndTime}
              />
            </>
          )}
<View style={styles.checkboxContainer}>
  <Text style={styles.checkboxLabel}>Set Reminder</Text>
  <Switch 
    value={!!reminder} 
    onValueChange={(value) => setReminder(value ? (allDay ? "12:12" : startTime || "00:00") : "")}
    />
</View>

          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>Completed</Text>
            <Switch value={completed} onValueChange={setCompleted} />
          </View>

          <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>{selectedTask ? "Update Task" : "Save Task"}</Text>
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
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