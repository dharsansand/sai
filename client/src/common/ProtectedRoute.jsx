import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { CommonData } from "../Context";
import { useGetMeQuery } from "../services/meApi";


const ProtectedPage = () => {
  const navigate = useNavigate();
  const { setAdminCurrentUser } = CommonData();
  
  const token = localStorage.getItem("token");

  const { data: user, isLoading, isError, error } = useGetMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
   
    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }

  
    if (isError) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("currentUser");
      setAdminCurrentUser(null);
      navigate("/admin/login", { replace: true });
    }

    if (user) {
      setAdminCurrentUser(user);
    }
  }, [token, user, isError, navigate, setAdminCurrentUser]);

  
  if (!token || isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <p>Verifying session...</p>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedPage;