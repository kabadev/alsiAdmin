import { createContext, useReducer } from "react";
import teamReducer from "./reducer";

const INITIAL_STATE = {
  teamlist: [],
  team: "",
  loading: false,
  error: null,
};
export const teamContext = createContext(INITIAL_STATE);
export const TeamContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(teamReducer, INITIAL_STATE);

  return (
    <teamContext.Provider
      value={{
        teamlist: state.teamlist,
        team: state.team,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </teamContext.Provider>
  );
};
