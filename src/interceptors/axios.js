import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/";

// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
//   "accessToken"
// )}`;
let refresh = false;

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;

      const response = await axios.post(
        "refresh",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data["accessToken"]}`;
        localStorage.setItem("accessToken", response.data["accessToken"]);
        return axios(error.config);
      } else {
        window.confirm("Not Auth");
      }
    }
    refresh = false;
    return error;
  }
);
