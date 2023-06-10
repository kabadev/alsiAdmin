import axios from "axios";
export const fetchTeamList = async (dispatch, query) => {
  dispatch({ type: "FETCH_TEAM_LIST_REQUEST" });
  try {
    const response = await axios.get("team");
    dispatch({ type: "FETCH_TEAM_LIST_SUCCESS", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "FETCH_TEAMLIST_FAILURE", payload: error });
  }
};

export const fetchTeam = async (dispatch, id) => {
  dispatch({ type: "FETCH_TEAM_REQUEST" });
  try {
    const response = await axios.get("team/" + id);
    dispatch({ type: "FETCH_TEAM_SUCCESS", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "FETCH_TEAM_FAILURE", payload: error });
  }
};

export const addTeam = async (dispatch, data) => {
  dispatch({ type: "ADD_TEAM_REQUEST" });
  try {
    const response = await axios.post("team", data);
    dispatch({ type: "ADD_TEAM_SUCCESS", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "ADD_TEAM_FAILURE", payload: error });
  }
};

export const updateTeam = async (dispatch, data, id) => {
  dispatch({ type: "UPDATE_TEAM_REQUEST" });
  try {
    const response = await axios.put("team/" + id, data);
    dispatch({ type: "UPDATE_TEAM_SUCCESS", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "UPDATE_TEAM_FAILURE", payload: error });
  }
};

export const deleteTeam = async (dispatch, id) => {
  dispatch({ type: "DELETE_TEAM_REQUEST" });
  try {
    const response = await axios.delete("team/" + id);
    dispatch({ type: "DELETE_TEAM_SUCCESS", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "DELETE_TEAM_FAILURE", payload: error });
  }
};
