import axios from "axios";
export const fetchEvents = async (dispatch, query) => {
  dispatch({ type: "FETCH_EVENTS_REQUEST" });
  try {
    const response = await axios.get("events");
    dispatch({ type: "FETCH_EVENTS_SUCCESS", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "FETCH_EVENTS_FAILURE", payload: error });
  }
};

export const fetchEvent = async (dispatch, id) => {
  dispatch({ type: "FETCH_EVENT_REQUEST" });
  try {
    const response = await axios.get("events/" + id);
    dispatch({ type: "FETCH_EVENT_SUCCESS", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "FETCH_EVENT_FAILURE", payload: error });
  }
};

export const addEvent = async (dispatch, data, options) => {
  dispatch({ type: "ADD_EVENT_REQUEST" });
  try {
    const response = await axios.post("events", data, options);
    const event = await response.json();
    dispatch({ type: "ADD_EVENT_SUCCESS", payload: event });
  } catch (error) {
    dispatch({ type: "ADD_EVENT_FAILURE", payload: error });
  }
};

export const updateEvent = async (dispatch, data, id) => {
  dispatch({ type: "UPDATE_EVENT_REQUEST" });
  try {
    const response = await axios.put("events/" + id, data);
    dispatch({ type: "UPDATE_EVENT_SUCCESS", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "UPDATE_EVENT_FAILURE", payload: error });
  }
};
export const deleteEventImage = async (dispatch, id, imgId) => {
  dispatch({ type: "DELETE_EVENT_IMAGE_REQUEST" });
  try {
    const response = await axios.put("events/" + id + "/" + imgId);
    dispatch({
      type: "DELETE_EVENT_IMAGE_SUCCESS",
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({ type: "DELETE_EVENT_IMAGE_FAILURE", payload: error });
  }
};

export const deleteEvent = async (dispatch, id) => {
  dispatch({ type: "DELETE_EVENT_REQUEST" });
  try {
    const response = await axios.delete("events/" + id);
    dispatch({ type: "DELETE_EVENT_SUCCESS", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "DELETE_EVENT_FAILURE", payload: error });
  }
};
