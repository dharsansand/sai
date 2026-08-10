import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { CommonData } from "../Context";
import { getData } from "../Api/apiRequest";

const ProtectedPage = () => {
  const { adminCurrentUser, setAdminCurrentUser } = CommonData();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/admin/login", { replace: true });

      try {
        const response = await getData("users/me"); 
        console.log("response",response)
        setAdminCurrentUser(response.data); 

        if(response?.status === 401){
             localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        localStorage.removeItem("currentUser")
        navigate("/admin/login", { replace: true });

        }
      } catch (err) {
        
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        navigate("/admin/login", { replace: true });
      }
    };
    fetchUser();
  }, [navigate, setAdminCurrentUser]);

  if (!adminCurrentUser) return null; // loader or blank screen until user is fetched

  return <Outlet />;
};

export default ProtectedPage;
