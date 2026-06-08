import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import View from "./View";
import { DataProvider } from "./Context";
import { ToastContainer } from "react-toastify";

const RootComponent = () => {
  return (
    <BrowserRouter>
    <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={true}
          pauseOnHover={true}
          theme="dark"
        />
      <DataProvider>
        <Routes>
        <Route path="/admin/*" element={<App />} />
           <Route path="/*" element={<View />} />
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")).render(<RootComponent />);
