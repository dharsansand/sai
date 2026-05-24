import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Views/Home";
import Header from "./components/common/Header";



const View = () => {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />


    </Routes>
    </>
  );
};

export default View;
