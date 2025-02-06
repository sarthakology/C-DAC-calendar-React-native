import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getMonth } from "../../util";
import DayModal from "../../modals/DayModel";
import GlobalContext from "../../context/GlobalContext";
import TaskList from "../../components/TaskList"; 

const getEventDots = (dayDate, savedEvents) => {
  const eventDots = savedEvents.filter(
    (event) => new Date(event.day).toDateString() === dayDate.toDateString()
  );
  return eventDots.map((event) => {
    const dotStyles = {
      green: styles.greenDot,
      purple: styles.purpleDot,
      gray: styles.grayDot,
      indigo: styles.indigoDot,
      red: styles.redDot,
      blue: styles.blueDot,
    };
    return <View style={dotStyles[event.label]} key={event.id} />;
  });
};

const Day = ({ day, onDayPress, savedEvents }) => {
  const today = new Date();
  const isToday =
    today.getDate() === day.date() &&
    today.getMonth() === day.month() &&
    today.getFullYear() === day.year();

  return (
    <TouchableOpacity
      style={[styles.dayContainer, isToday ? styles.todayContainer : null]}
      onPress={() => onDayPress(day)}
    >
      <Text style={[styles.dayText, isToday ? styles.todayText : null]}>
        {day.date() || ""}
      </Text>
      <View style={styles.dotContainer}>{getEventDots(day.toDate(), savedEvents)}</View>
    </TouchableOpacity>
  );
};

const Month = ({ month, onDayPress, savedEvents }) => (
  <View style={styles.monthContainer}>
    {month.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.weekRow}>
        {row.map((day, dayIndex) => (
          <Day
            key={dayIndex}
            day={day}
            onDayPress={onDayPress}
            savedEvents={savedEvents}
          />
        ))}
      </View>
    ))}
  </View>
);

const TaskCard = ({ task }) => (
  <View style={styles.taskCard}>
    <Text style={styles.taskTitle}>{task.title}</Text>
    <Text style={styles.taskDate}>{new Date(task.day).toDateString()}</Text>
    <Text style={styles.taskDescription}>{task.description}</Text>
  </View>
);

export default function HomeScreen({ navigation }) {

  const { savedEvents, setDaySelected } = useContext(GlobalContext);

  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [currentMonth, setCurrentMonth] = useState(getMonth(monthIndex));
  const [tasksForMonth, setTasksForMonth] = useState(
    savedEvents.filter((event) => new Date(event.day).getMonth() === monthIndex)
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const getEventsForSelectedDay = () => {
    return selectedDay
      ? savedEvents.filter(
          (event) =>
            new Date(event.day).toDateString() === selectedDay.toDateString()
        )
      : [];
  };

  const handlePrevMonth = () => {
    const newMonthIndex = monthIndex - 1;
    setMonthIndex(newMonthIndex);
    setCurrentMonth(getMonth(newMonthIndex));
    setTasksForMonth(
      savedEvents.filter(
        (event) => new Date(event.day).getMonth() === newMonthIndex
      )
    );
  };

  const handleNextMonth = () => {
    const newMonthIndex = monthIndex + 1;
    setMonthIndex(newMonthIndex);
    setCurrentMonth(getMonth(newMonthIndex));
    setTasksForMonth(
      savedEvents.filter(
        (event) => new Date(event.day).getMonth() === newMonthIndex
      )
    );
  };

  const handleDayPress = (day) => {
    const selectedDate = day.toDate();
    setSelectedDay(selectedDate);
    setDaySelected(selectedDate);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollContainer}>
        <DayModal
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          selectedDay={selectedDay ? selectedDay.toDateString() : ""}
          events={getEventsForSelectedDay()}
        />
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={handlePrevMonth} style={styles.navButton}>
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <Text style={styles.monthText}>
                {currentMonth[1][3].format("MMMM")}
              </Text>
              <Text style={styles.yearText}>
                {currentMonth[1][3].format("YYYY")}
              </Text>
            </View>
            <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
              <Ionicons name="chevron-forward" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.dayNamesContainer}>
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, index) => (
              <Text key={index} style={styles.dayName}>
                {day}
              </Text>
            ))}
          </View>
          <Month
            month={currentMonth}
            onDayPress={handleDayPress}
            savedEvents={savedEvents}
          />
          
          {/* Tasks Section Below Calendar */}
          <TaskList monthIndex={monthIndex} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContainer: { flex: 1 },
  container: { flex: 1, alignItems: "center", padding: 20 },
  headerContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: 50 },
  headerTextContainer: { alignItems: "center" },
  monthText: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 5 },
  yearText: { fontSize: 18, fontWeight: "300", color: "#666" },
  navButton: { backgroundColor: "#fff", padding: 10, borderRadius: 15, borderWidth: 0.5, borderColor: "#ddd" },
  dayNamesContainer: { flexDirection: "row", width: "100%", justifyContent: "space-around", marginBottom: 10 },
  dayName: { fontSize: 16, fontWeight: "500", color: "#333" },
  monthContainer: { width: "100%" },
  weekRow: { flexDirection: "row", justifyContent: "space-around", marginBottom: 10 },
  dayContainer: { width: "13%", height: 60, alignItems: "center", justifyContent: "center" },
  dayText: { fontSize: 16, color: "#333" },
  dotContainer: { flexDirection: "row", justifyContent: "center" },
  indigoDot: { width: 5, height: 5, borderRadius: 4, backgroundColor: "white", borderWidth: 1, borderColor: "indigo", marginLeft: 1.5, marginRight: 1.5 },
  grayDot: { width: 5, height: 5, borderRadius: 4, backgroundColor: "white", borderWidth: 1, borderColor: "gray", marginLeft: 1.5, marginRight: 1.5 },
  greenDot: { width: 5, height: 5, borderRadius: 4, backgroundColor: "white", borderWidth: 1, borderColor: "green", marginLeft: 1.5, marginRight: 1.5 },
  blueDot: { width: 5, height: 5, borderRadius: 4, backgroundColor: "white", borderWidth: 1, borderColor: "blue", marginLeft: 1.5, marginRight: 1.5 },
  redDot: { width: 5, height: 5, borderRadius: 4, backgroundColor: "white", borderWidth: 1, borderColor: "red", marginLeft: 1.5, marginRight: 1.5 },
  purpleDot: { width: 5, height: 5, borderRadius: 4, backgroundColor: "white", borderWidth: 1, borderColor: "purple", marginLeft: 1.5, marginRight: 1.5 },
  todayText: { color: "#007bff", fontWeight: "bold" },  
});