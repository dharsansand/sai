import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router-dom";

import "../css/product/products.css";
import ProductsCard from "./productcard";
import ProductCategory from "./productcategory";
import { getData } from "../Api/apiRequest";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [productsData, setProductsData] = useState([]);
  const { id } = useParams(); // This is the slug from the URL

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = id ? `product?category=${id}` : "product";
        const response = await getData(url);
        const data = response?.data?.data || response?.data || response;
        setProductsData(Array.isArray(data) ? data : []);
        
        // If we have an ID in URL but activeCategory is "All", 
        // you might want to find the category name to update the label.
        // For now, let's keep it simple.
      } catch (error) {
        setProductsData([]);
      }
    };
    fetchProducts();
  }, [id]);

  return (
    <div className="products-page-wrapper">
      <Container>
        <Row>
          <Col lg={3} md={4} xs={12} className="category-column">
            <ProductCategory active={activeCategory} onSelect={setActiveCategory} />
          </Col>

          <Col lg={9} md={8} xs={12}>
            <Row className="g-4">
              <AnimatePresence mode="popLayout">
                {productsData.length > 0 ? (
                  productsData.map((item) => (
                    <Col key={item._id} lg={4} md={6} sm={6} xs={12}>
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                      >
                        <ProductsCard product={item} />
                      </motion.div>
                    </Col>
                  ))
                ) : (
                  <Col xs={12} className="text-center p-5">
                    <p>No products found.</p>
                  </Col>
                )}
              </AnimatePresence>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}