import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Views/Home";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Loader from "./components/common/Loader";
import Products from "./Views/products";
import ProductDetails from "./Views/ProductDetails";
import Contact from "./Views/Contact";

const View = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Products />} />
        <Route path="/productDetails/:slug" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
      <Footer />
    </>
  );
};

export default View;