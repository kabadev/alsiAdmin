function newsReducer(state, action) {
  switch (action.type) {
    // fetch All events
    case "FETCH_NEWSLIST_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_NEWSLIST_SUCCESS":
      return {
        ...state,
        newslist: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_NEWSLIST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //  fetch single event
    case "FETCH_NEWS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_NEWS_SUCCESS":
      return {
        ...state,
        news: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_NEWS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //  addd single event
    case "ADD_NEWS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "ADD_NEWS_SUCCESS":
      return {
        ...state,
        news: action.payload,
        loading: false,
        error: null,
      };
    case "ADD_NEWS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //update event
    case "UPDATE_NEWS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "UPDATE_NEWS_SUCCESS":
      return {
        ...state,
        news: action.payload,
        loading: false,
        error: null,
      };
    case "UPDATE_NEWS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //Delate event
    case "DELETE_NEWS_REQUEST":
      return {
        ...state,

        loading: true,
        error: null,
      };
    case "DELETE_NEWS_SUCCESS":
      return {
        ...state,
        news: action.payload,
        loading: false,
        error: null,
      };
    case "DELETE_NEWS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default newsReducer;
