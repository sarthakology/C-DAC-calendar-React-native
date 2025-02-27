import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Checkbox } from "react-native-paper";
import GlobalContext from "../context/GlobalContext";
import { useTranslation } from 'react-i18next'; // Import translation hook

const TaskCard = ({ task, onPress }) => (
  <TouchableOpacity onPress={() => onPress(task.id)}>
    <View style={[styles.taskCard, task.completed && styles.completedTask]}>
      <View style={styles.taskInfo}>
        <Text style={[styles.taskTitle, task.completed && styles.completedText]}>
          {task.title}
        </Text>
        <Text style={styles.taskDate}>
          {`${useTranslation().t('Date')}: {new Date(task.date).toDateString()}`}
        </Text>
        <Text style={styles.taskDescription}>{task.description}</Text>
      </View>
      <Checkbox status={task.completed ? "checked" : "unchecked"} color="#4CAF50" />
    </View>
  </TouchableOpacity>
);

export default function TaskList({ monthIndex }) {
  const { t } = useTranslation(); // Initialize the translation hook
  
  const { savedTasks, dispatchCalTask } = useContext(GlobalContext);

  const handleTaskPress = (taskId) => {
    const taskToUpdate = savedTasks.find((task) => task.id === taskId);
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
      dispatchCalTask({ type: "update", payload: updatedTask });
    }
  };
 
  return (
    <View style={styles.tasksContainer}>
      <Text style={styles.tasksHeader}>{t('Tasks for the Month')}</Text>
      {savedTasks
        .filter((task) => new Date(task.date).getMonth() === monthIndex)
        .sort((a, b) => a.completed - b.completed)
        .map((task) => (
          <TaskCard key={task.id} task={task} onPress={handleTaskPress} />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tasksContainer: {
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  tasksHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  completedTask: {
    backgroundColor: "#f0f0f0",
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  taskDate: {
    fontSize: 14,
    color: "#666",
  },
  taskDescription: {
    fontSize: 12,
    color: "#888",
  },
});
