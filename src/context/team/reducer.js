function teamReducer(state, action) {
  switch (action.type) {
    // fetch All events
    case "FETCH_TEAM_LIST_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_TEAM_LIST_SUCCESS":
      return {
        ...state,
        teamlist: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_TEAMLIST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //  fetch single event
    case "FETCH_TEAM_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_TEAM_SUCCESS":
      return {
        ...state,
        team: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_TEAM_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //  addd single event
    case "ADD_TEAM_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "ADD_TEAM_SUCCESS":
      return {
        ...state,
        team: action.payload,
        loading: false,
        error: null,
      };
    case "ADD_TEAM_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //update event
    case "UPDATE_TEAM_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "UPDATE_TEAM_SUCCESS":
      return {
        ...state,
        team: action.payload,
        loading: false,
        error: null,
      };
    case "UPDATE_TEAM_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //Delate event
    case "DELETE_TEAM_REQUEST":
      return {
        ...state,

        loading: true,
        error: null,
      };
    case "DELETE_TEAM_SUCCESS":
      return {
        ...state,
        team: action.payload,
        loading: false,
        error: null,
      };
    case "DELETE_TEAM_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default teamReducer;
