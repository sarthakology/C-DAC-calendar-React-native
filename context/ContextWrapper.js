import React, {useState, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalContext from './GlobalContext';
import dayjs from 'dayjs';
import { DevSettings } from 'react-native'
import saveEvent from '../services/SaveEvent';
import saveTask from '../services/SaveTask'; // Import a saveTask service if needed

// Reducer
function savedEventsReducer(state, {type, payload}) {
  switch (type) {
    case 'push':
      return [...state, payload];
    case 'update':
      return state.map(evt => (evt.id === payload.id ? payload : evt));
    case 'delete':
      return state.filter(evt => evt.id !== payload.id);
    case 'deleteAll':
      return [];
    default:
      throw new Error('Invalid action type');
  }
}

function savedTasksReducer(state, {type, payload}) {
  switch (type) {
    case 'push':
      return [...state, payload];
    case 'update':
      return state.map(task => (task.id === payload.id ? payload : task));
    case 'delete':
      return state.filter(task => task.id !== payload.id);
    case 'deleteAll':
      return [];
    default:
      throw new Error('Invalid action type');
  }
}

// Initialize from AsyncStorage
async function initEvents() {
  try {
    const storageEvents = await AsyncStorage.getItem('savedEvents');
    return storageEvents ? JSON.parse(storageEvents) : [];
  } catch (error) {
    console.error('Failed to fetch events from storage', error);
    return [];
  }
}

async function initTasks() {
  try {
    const storageTasks = await AsyncStorage.getItem('savedTasks');
    return storageTasks ? JSON.parse(storageTasks) : [];
  } catch (error) {
    console.error('Failed to fetch tasks from storage', error);
    return [];
  }
}


export default function ContextWrapper(props) {
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    () => [],
  );
  const [savedTasks, dispatchCalTask] = useReducer(
    savedTasksReducer,
    [],
    () => [],
  );
  
  const resetAppData = async () => {
    // this function removes savedEvents, savedTasks, accesToken and refreshToken
    await AsyncStorage.removeItem('savedEvents');
    await AsyncStorage.removeItem('savedTasks');

    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
  
    dispatchCalEvent({ type: 'deleteAll' });
    dispatchCalTask({ type: 'deleteAll' });

    DevSettings.reload(); // 🔄 Reloads the entire app
  
  };

  // Initialize saved tasks and events from AsyncStorage
  useEffect(() => {
    const loadEvents = async () => {
      const events = await initEvents();
      events.forEach(evt => dispatchCalEvent({type: 'push', payload: evt}));
    };
    loadEvents();
  }, []);

  useEffect(() => {
    const loadTasks = async () => {
      const tasks = await initTasks();
      tasks.forEach(task => dispatchCalTask({type: 'push', payload: task}));
    };
    loadTasks();
  }, []);

  // Save tasks and events to AsyncStorage whenever they change
  useEffect(() => {
    const saveEvents = async () => {
      try {
        await AsyncStorage.setItem('savedEvents', JSON.stringify(savedEvents));
        await saveEvent(savedEvents);
      } catch (error) {
        console.error('Failed to save events to storage', error);
      }
    };
    saveEvents();
  }, [savedEvents]);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('savedTasks', JSON.stringify(savedTasks));
        await saveTask(savedTasks);
      } catch (error) {
        console.error('Failed to save tasks to storage', error);
      }
    };
    saveTasks();
  }, [savedTasks]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  useEffect(() => {
    if (!showTaskModal) {
      setSelectedTask(null);
    }
  }, [showTaskModal]);

  return (
    <GlobalContext.Provider
      value={{
        daySelected,
        setDaySelected,

        showEventModal,
        setShowEventModal,

        showTaskModal,
        setShowTaskModal,

        dispatchCalEvent,
        dispatchCalTask,

        selectedEvent,
        selectedTask,
        setSelectedEvent,
        setSelectedTask,

        savedEvents,
        savedTasks,

        resetAppData
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
}
