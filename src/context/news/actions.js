import axios from "axios";
export const fetchNewsList = async (dispatch, query) => {
  dispatch({ type: "FETCH_NEWSLIST_REQUEST" });
  try {
    const response = await axios.get("news");
    dispatch({ type: "FETCH_NEWSLIST_SUCCESS", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "FETCH_NEWSLIST_FAILURE", payload: error });
  }
};

export const fetchNews = async (dispatch, id) => {
  dispatch({ type: "FETCH_NEWS_REQUEST" });
  try {
    const response = await axios.get("news/" + id);
    dispatch({ type: "FETCH_NEWS_SUCCESS", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "FETCH_NEWS_FAILURE", payload: error });
  }
};

export const addNews = async (dispatch, data) => {
  dispatch({ type: "ADD_NEWS_REQUEST" });
  try {
    const response = await axios.post("news", data);
    dispatch({ type: "ADD_NEWS_SUCCESS", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "ADD_NEWS_FAILURE", payload: error });
  }
};

export const updateNews = async (dispatch, data, id) => {
  dispatch({ type: "UPDATE_NEWS_REQUEST" });
  try {
    const response = await axios.put("news/" + id, data);
    dispatch({ type: "UPDATE_NEWS_SUCCESS", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "UPDATE_NEWS_FAILURE", payload: error });
  }
};

export const deleteNews = async (dispatch, id) => {
  dispatch({ type: "DELETE_NEWS_REQUEST" });
  try {
    const response = await axios.delete("news/" + id);
    dispatch({ type: "DELETE_NEWS_SUCCESS", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "DELETE_NEWS_FAILURE", payload: error });
  }
};
