import { createContext, useContext, useState, useEffect } from "react";
// import { getData } from "./Admin/apicalls/apiRequest";


const DataContext = createContext();

export const DataProvider = ({ children }) => {
  //! For admin panel
  const [adminCurrentUser, setAdminCurrentUser] = useState(null);
  const [collapsedstate, setCollapsedstate] = useState(null);
  const [token, setToken] = useState(null);

  // ! windowsize
  const FindWindowSize = () => {
    const [windowSize, setWindowSize] = useState([
      window.innerWidth,
      window.innerHeight,
    ]);

    useEffect(() => {
      const windowSizeHandler = () => {
        setWindowSize([window.innerWidth, window.innerHeight]);
      };
      window.addEventListener("resize", windowSizeHandler);

      return () => {
        window.removeEventListener("resize", windowSizeHandler);
      };
    }, []);

    return windowSize;
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setToken(token);
  }, []);


  return (
    <DataContext.Provider
      value={{
        adminCurrentUser,
        setAdminCurrentUser,
        collapsedstate,
        setCollapsedstate,
        FindWindowSize,
        token,
        setToken,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const CommonData = () => useContext(DataContext);
