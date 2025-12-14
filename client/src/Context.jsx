import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Admin state
  const [adminCurrentUser, setAdminCurrentUser] = useState(null);
  const [collapsedstate, setCollapsedstate] = useState(false);
  const [token, setToken] = useState(null);

  // Sync token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token"); 
    setToken(storedToken);
  }, []);

  return (
    <DataContext.Provider
      value={{
        adminCurrentUser,
        setAdminCurrentUser,
        collapsedstate,
        setCollapsedstate,
        token,
        setToken,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const CommonData = () => useContext(DataContext);
