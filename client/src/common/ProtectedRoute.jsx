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
        const response = await getData("users/me"); // getData must send Authorization header
        setAdminCurrentUser(response.data); // backend returns user directly
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
