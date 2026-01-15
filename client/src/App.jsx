import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLoginForm from "./Admin/AdminLogin";
import Home from "./Admin/Home";
import Layout from "./components/Layout";
import ProtectedPage from "./common/ProtectedRoute";
import Dashboard from "./Admin/dashbord";
import User from "./Admin/user/user";

const App = () => {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="login" element={<AdminLoginForm />} />

   
      <Route element={<ProtectedPage />}>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} /> {/* relative */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user" element={<User />} />
          
          {/* other admin routes */}
        </Route>
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  );
};

export default App;
