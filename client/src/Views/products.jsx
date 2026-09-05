import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Placeholder } from "react-bootstrap"; // Added Card and Placeholder
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router-dom";

import "../css/product/products.css";
import ProductsCard from "./productcard";
import ProductCategory from "./productcategory";
import { getData } from "../Api/apiRequest";
import { useGetProductsQuery } from "../services/productApi";

// --- Skeleton Component ---
const ProductSkeleton = () => (
  <Col lg={4} md={6} sm={6} xs={12} className="mb-4">
    <Card style={{ border: 'none', borderRadius: '10px' }}>
      {/* Mimics the product image */}
      <div style={{ backgroundColor: '#e9ecef', height: '200px', borderRadius: '10px' }} className="placeholder-glow">
        <div className="placeholder w-100 h-100"></div>
      </div>
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={8} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={4} /> <Placeholder xs={4} />
        </Placeholder>
      </Card.Body>
    </Card>
  </Col>
);

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");


  const { id } = useParams();

  const { data: response, isLoading } = useGetProductsQuery(id);

  const rawData = response?.data?.data || response?.data || response;
  const productsData = Array.isArray(rawData) ? rawData : [];

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
                {isLoading ? (
                  // 3. Render Skeletons (6 items as placeholders)
                  Array.from({ length: 6 }).map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))
                ) : productsData.length > 0 ? (
                  productsData.map((item) => (
                    <Col key={item._id} lg={4} md={6} sm={6} xs={12}>
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
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