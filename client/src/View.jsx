import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Views/Home";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Loader from "./components/common/Loader";
import Products from "./Views/products";



const View = () => {
  const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
   
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);


    return () => clearTimeout(timer);
  }, []);
   if (isLoading) {
    return <Loader />
  }


  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />


    </Routes>
    <Footer/>
    </>
  );
};

export default View;
