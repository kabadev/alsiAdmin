import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const options = {
  //   autoClose: 2000,
  //   position: toast.POSITION.TOP_RIGHT,
  className: "toast_notif",

  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const toastSuccess = (message) => {
  console.log("Hello0 success toast");
  toast.success(message, options);
};

export const toastError = (message) => {
  toast.error(message, options);
};

export const toastWarning = (message) => {
  toast.warn(message, options);
};

export const toastInformation = (message) => {
  toast.info(message, options);
};

export const toastDark = (message) => {
  toast.dark(message, options);
};

export const toastDefault = (message) => {
  toast(message, options);
};
