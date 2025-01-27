import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    case "deleteAll":
      return [];
    default:
      throw new Error("Invalid action type");
  }
}

async function initEvents() {
  try {
    const storageEvents = await AsyncStorage.getItem("savedEvents");
    return storageEvents ? JSON.parse(storageEvents) : [];
  } catch (error) {
    console.error("Failed to fetch events from storage", error);
    return [];
  }
}

export default function ContextWrapper(props) {

  const [daySelected, setDaySelected] = useState(dayjs());

  const [showEventModal, setShowEventModal] = useState(false);


  const [selectedEvent, setSelectedEvent] = useState(null);


  const [labels, setLabels] = useState([]);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    () => []
  );

  // Initialize saved events from AsyncStorage
  useEffect(() => {
    const loadEvents = async () => {
      const events = await initEvents();
      events.forEach((evt) => dispatchCalEvent({ type: "push", payload: evt }));
    };
    loadEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

  // Save events to AsyncStorage whenever they change
  useEffect(() => {
    const saveEvents = async () => {
      try {
        await AsyncStorage.setItem("savedEvents", JSON.stringify(savedEvents));
      } catch (error) {
        console.error("Failed to save events to storage", error);
      }
    };
    saveEvents();
  }, [savedEvents]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map(
        (label) => {
          const currentLabel = prevLabels.find(
            (lbl) => lbl.label === label
          );
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }
      );
    });
  }, [savedEvents]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  function updateLabel(label) {
    setLabels(
      labels.map((lbl) => (lbl.label === label.label ? label : lbl))
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
{/*import React, { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import saveEvent from "../services/SaveEvent";
import saveTask from "../services/SaveTask";

// Reducer for handling event-related actions
function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    case "deleteAll":
      return [];
    default:
      throw new Error("Invalid action type");
  }
}

// Reducer for handling task-related actions
function taskReducer(state, { type, payload }) {
  switch (type) {
    case "add":
      return [...state, payload];
    case "update":
      return state.map((task) => (task.id === payload.id ? payload : task));
    case "delete":
      return state.filter((task) => task.id !== payload.id);
    case "deleteAll":
      return [];
    default:
      throw new Error("Invalid action type");
  }
}

async function initEvents() {
  try {
    const storageEvents = await AsyncStorage.getItem("savedEvents");
    return storageEvents ? JSON.parse(storageEvents) : [];
  } catch (error) {
    console.error("Error initializing events:", error);
    return [];
  }
}

async function initTasks() {
  try {
    const storageTasks = await AsyncStorage.getItem("savedTasks");
    return storageTasks ? JSON.parse(storageTasks) : [];
  } catch (error) {
    console.error("Error initializing tasks:", error);
    return [];
  }
}

export default function ContextWrapper({ children }) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, []);
  const [savedTasks, dispatchTask] = useReducer(taskReducer, []);
  const [showSidebar, setShowSidebar] = useState(true);
  const [calendarEventToggle, setCalendarEventToggle] = useState(true);
  const [loader, setLoader] = useState(false);

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

  // Initialize saved events
  useEffect(() => {
    async function loadEvents() {
      const events = await initEvents();
      dispatchCalEvent({ type: "push", payload: events });
    }
    loadEvents();
  }, []);

  // Initialize saved tasks
  useEffect(() => {
    async function loadTasks() {
      const tasks = await initTasks();
      dispatchTask({ type: "add", payload: tasks });
    }
    loadTasks();
  }, []);

  // Sync saved events with AsyncStorage and backend
  useEffect(() => {
    const handleSaveEvents = async () => {
      try {
        await AsyncStorage.setItem("savedEvents", JSON.stringify(savedEvents));
        await saveEvent(savedEvents); // Optional: Save to backend
      } catch (error) {
        console.error("Error saving events:", error);
      }
    };
    handleSaveEvents();
  }, [savedEvents]);

  // Sync saved tasks with AsyncStorage and backend
  useEffect(() => {
    const handleSaveTasks = async () => {
      try {
        await AsyncStorage.setItem("savedTasks", JSON.stringify(savedTasks));
        await saveTask(savedTasks); // Optional: Save to backend
      } catch (error) {
        console.error("Error saving tasks:", error);
      }
    };
    handleSaveTasks();
  }, [savedTasks]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
        const currentLabel = prevLabels.find((lbl) => lbl.label === label);
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  function updateLabel(label) {
    setLabels(
      labels.map((lbl) => (lbl.label === label.label ? label : lbl))
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
        showSidebar,
        setShowSidebar,
        calendarEventToggle,
        setCalendarEventToggle,
        loader,
        setLoader,
        savedTasks,
        dispatchTask,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
*/}