function eventReducer(state, action) {
  switch (action.type) {
    // fetch All events
    case "FETCH_EVENTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_EVENTS_SUCCESS":
      return {
        ...state,
        events: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_EVENTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //  fetch single event
    case "FETCH_EVENT_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_EVENT_SUCCESS":
      return {
        ...state,
        event: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_EVENT_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //  addd single event
    case "ADD_EVENT_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "ADD_EVENT_SUCCESS":
      return {
        ...state,
        event: action.payload,
        loading: false,
        error: null,
      };
    case "ADD_EVENT_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //update event
    case "UPDATE_EVENT_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "UPDATE_EVENT_SUCCESS":
      return {
        ...state,
        event: action.payload,
        loading: false,
        error: null,
      };
    case "UPDATE_EVENT_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //DELETEImage
    case "DELETE_EVENT_IMAGE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "DELETE_EVENT_IMAGE_SUCCESS":
      return {
        ...state,
        event: action.payload,
        loading: false,
        error: null,
      };
    case "DELETE_EVENT_IMAGE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //Delate event
    case "DELETE_EVENT_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "DELETE_EVENT_SUCCESS":
      return {
        ...state,
        event: action.payload,
        loading: false,
        error: null,
      };
    case "DELETE_EVENT_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default eventReducer;
