import axios from "axios";
export const fetchPosts = async (dispatch, query) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const posts = await response.json();
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  } catch (error) {}
};

export const addPost = async (title, body) => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const posts = await response.json();
  dispatch({ type: "ADD_POST", payload: posts });
};

export const updatePost = async (id, title, body) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        title,
        body,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  const post = await response.json();
  dispatch({ type: "UPDATE_POST", payload: post });
};

export const deletePost = async (id) => {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
  });
  dispatch({ type: "DELETE_POST", payload: id });
};
