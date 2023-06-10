import { createContext, useEffect, useReducer } from "react";
import newsReducer from "./reducer";

const INITIAL_STATE = {
  newslist: [],
  news: "",
  loading: false,
  error: null,
};
export const newsContext = createContext(INITIAL_STATE);
export const NewsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(newsReducer, INITIAL_STATE);

  return (
    <newsContext.Provider
      value={{
        newslist: state.newslist,
        news: state.news,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </newsContext.Provider>
  );
};
