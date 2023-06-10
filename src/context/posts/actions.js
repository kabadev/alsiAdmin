// import axios from "axios";
// export const fetchPosts = async (dispatch, query) => {
//   dispatch({ type: "FETCH_POSTS_REQUEST" });
//   try {
//     const response = await axios.get(
//       "https://jsonplaceholder.typicode.com/posts"
//     );
//     const posts = await response.json();
//     dispatch({ type: "FETCH_POSTS_SUCCESS", payload: posts });
//   } catch (error) {
//     dispatch({ type: "FETCH_POSTS_FAILURE", payload: error });
//   }
// };

// export const addPost = async (dispatch, data, options) => {
//   console.log("test");
//   dispatch({ type: "ADD_POST_REQUEST" });
//   try {
//     const response = await axios.post(
//       "http://localhost:8000/api/events",
//       data,
//       options
//     );
//     const posts = await response.json();
//     dispatch({ type: "ADD_POST_SUCCESS", payload: posts });
//     window.location.href = "/events";
//   } catch (error) {
//     dispatch({ type: "ADD_POST_FAILURE", payload: error });
//   }
// };

// // export const updatePost = async (dispatch, id, data) => {
// //   const response = await fetch(
// //     `https://jsonplaceholder.typicode.com/posts/${id}`,
// //     {
// //       method: "PUT",
// //       body: JSON.stringify({
// //         title,
// //         body,
// //       }),
// //       headers: {
// //         "Content-type": "application/json; charset=UTF-8",
// //       },
// //     }
// //   );
// //   const post = await response.json();
// //   dispatch({ type: "UPDATE_POST", payload: post });
// // };

// // export const deletePost = async (id) => {
// //   await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
// //     method: "DELETE",
// //   });
// //   dispatch({ type: "DELETE_POST", payload: id });
// // };
