import React from "react";
import { Card, Col } from "react-bootstrap";

export const ProductCardSkeleton = () => (
  <Col lg={4} md={6} sm={6} xs={12}>
    <Card className="product-main-card h-100 shadow-sm border-0">
      <div className="skeleton skeleton-img" />
      <Card.Body className="d-flex flex-column">
        <div className="skeleton skeleton-text" style={{ width: '30%' }} />
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text" style={{ width: '80%' }} />
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div className="skeleton skeleton-text" style={{ width: '40px', marginBottom: 0 }} />
          <div className="skeleton skeleton-btn" />
        </div>
      </Card.Body>
    </Card>
  </Col>
);