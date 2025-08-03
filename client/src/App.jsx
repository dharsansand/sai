import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Admin/Home";
import AdminLoginForm from "./Admin/AdminLogin";


const App = () => {
  return (
    <Routes>
       <Route path="/" element={<AdminLoginForm />} />
      <Route path="/home" element={<Home />} />


    </Routes>
  );
};

export default App;
