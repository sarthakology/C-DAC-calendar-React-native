import React from "react";


const GlobalContext = React.createContext({
  daySelected: null,
  setDaySelected: () => {},
  
  showEventModal: false,
  setShowEventModal: () => {},
  
  showTaskModal: false,
  setShowTaskModal: () => {},

  dispatchCalEvent: () => {},
  savedEvents: [],

  dispatchCalTask: () => {},
  savedTasks: [],
  
  selectedEvent: null,
  setSelectedEvent: () => {},
  
  selectedTask: null,
  setSelectedTask: () => {},

  resetAppData: () => {},
});

export default GlobalContext;

