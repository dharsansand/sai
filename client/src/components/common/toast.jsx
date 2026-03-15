import { toast } from "react-toastify";
const toastStyle = {
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: "500",
  padding: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
};

// success
export const ToastSuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    style: {
      ...toastStyle,
      background: "#28a745",
      color: "#fff",
    },
  });
};

// error
export const ToastError = (msg) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    style: {
      ...toastStyle,
      background: "#dc3545",
      color: "#fff",
    },
  });
};