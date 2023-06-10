import { createContext, useEffect, useReducer } from "react";
import eventReducer from "./reducer";

const INITIAL_STATE = {
  events: [],
  event: "",
  loading: false,
  error: null,
};
export const eventContext = createContext(INITIAL_STATE);
export const EventContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, INITIAL_STATE);

  return (
    <eventContext.Provider
      value={{
        events: state.events,
        event: state.event,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </eventContext.Provider>
  );
};
