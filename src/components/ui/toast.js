import { toast } from "react-toastify";

export const notify = (message, type, position) => {
  toast[type](message, {
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
