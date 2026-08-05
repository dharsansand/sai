import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AnimatePresence } from "framer-motion";

import "../css/product/products.css";
import ProductsCard from "./productcard";
import ProductCategory from "./productcategory";

const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Noise Cancelling Headphones",
    category: "Electronics",
    price: "$299",
    description: "Experience pure sound with our flagship wireless headphones featuring industry-leading noise cancellation.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format"
  },
  {
    id: 2,
    name: "Minimalist Leather Watch",
    category: "Lifestyle",
    price: "$150",
    description: "A sleek, timeless design for the modern professional. Genuine Italian leather strap included.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format"
  },
  {
    id: 3,
    name: "Urban Explorer Backpack",
    category: "Fashion",
    price: "$85",
    description: "Water-resistant, durable, and stylish. The perfect companion for your daily city adventures.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format"
  }
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" 
    ? PRODUCTS_DATA 
    : PRODUCTS_DATA.filter(p => p.category === activeCategory);

  return (
    <div className="products-page-wrapper">
      <Container>
        <Row className="justify-content-center">
          {/* LEFT SIDE: Category */}
          <Col lg={3} md={4} xs={12}>
            <ProductCategory active={activeCategory} onSelect={setActiveCategory} />
          </Col>

          {/* RIGHT SIDE: Products */}
          <Col lg={9} md={8} xs={12}>
            <Row className="g-4">
              <AnimatePresence mode="wait">
                {filtered.map((item) => (
                  <Col key={item.id} lg={4} md={6} sm={6}>
                    <ProductsCard product={item} />
                  </Col>
                ))}
              </AnimatePresence>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}