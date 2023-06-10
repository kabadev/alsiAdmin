function postsReducer(state, action) {
  switch (action.type) {
    // fetch All posts
    case "FETCH_POSTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_POSTS_SUCCESS":
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_POSTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //  fetch single post
    case "FETCH_POST_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_POST_SUCCESS":
      return {
        ...state,
        post: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_POST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //  addd single post
    case "ADD_POST_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "ADD_POST_SUCCESS":
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null,
      };
    case "ADD_POST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //update post
    case "UPDATE_POST_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "UPDATE_POST_SUCCESS":
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null,
      };
    case "UPDATE_POST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //Delate Post
    case "DELETE_POST_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "DELETE_POST_SUCCESS":
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null,
      };
    case "DELETE_POST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default postsReducer;
