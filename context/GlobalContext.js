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

  dispatchTask: () => {},
  savedTasks: [],
  
  selectedEvent: null,
  setSelectedEvent: () => {},
  
  selectedTask: null,
  setSelectedTask: () => {},
});

export default GlobalContext;

