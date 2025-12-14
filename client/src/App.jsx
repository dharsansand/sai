import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLoginForm from "./Admin/AdminLogin";
import Home from "./Admin/Home";
import Layout from "./components/Layout";
import ProtectedPage from "./common/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="login" element={<AdminLoginForm />} />

      {/* PROTECTED ADMIN */}
      <Route element={<ProtectedPage />}>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="home" replace />} /> {/* relative */}
          <Route path="home" element={<Home />} />
          {/* other admin routes */}
        </Route>
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  );
};

export default App;
