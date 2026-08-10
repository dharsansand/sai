import React, { useEffect, useState } from "react";
import { Container, Row, Col, Placeholder } from "react-bootstrap"; // Replaced Spinner with Placeholder
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";

import "../css/product/productdetails.css";
import { getData } from "../Api/apiRequest";

// --- Skeleton Component for the Details Page ---
const DetailsSkeleton = () => (
  <div className="details-page-wrapper">
    <Container>
      {/* Breadcrumb Skeleton */}
      <Placeholder as="div" animation="glow" className="mb-4">
        <Placeholder xs={4} style={{ height: '20px', borderRadius: '4px' }} />
      </Placeholder>

      <Row className="g-5">
        <Col lg={6} md={6} xs={12}>
          <div className="gallery-card">
            {/* Main Image Skeleton */}
            <div className="main-image-frame placeholder-glow" style={{ backgroundColor: '#f0f0f0', height: '450px' }}>
              <div className="placeholder w-100 h-100"></div>
            </div>
            {/* Thumbnails Skeleton */}
            <div className="thumb-row mt-3 d-flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="placeholder-glow" style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden' }}>
                  <div className="placeholder w-100 h-100"></div>
                </div>
              ))}
            </div>
          </div>
        </Col>

        <Col lg={6} md={6} xs={12}>
          <div className="info-panel">
            {/* Category Skeleton */}
            <Placeholder as="div" animation="glow" className="mb-2">
              <Placeholder xs={2} size="xs" />
            </Placeholder>
            
            {/* Title Skeleton */}
            <Placeholder as="h1" animation="glow" className="mb-3">
              <Placeholder xs={8} style={{ height: '40px' }} />
            </Placeholder>

            {/* Content/Description Skeleton */}
            <Placeholder as="div" animation="glow" className="mb-4">
              <Placeholder xs={12} size="sm" className="mb-1" />
              <Placeholder xs={11} size="sm" className="mb-1" />
              <Placeholder xs={9} size="sm" />
            </Placeholder>

            {/* Specs Skeleton */}
            <div className="info-specs mb-4">
              {[1, 2, 3].map((i) => (
                <Placeholder key={i} as="div" animation="glow" className="d-flex mb-2">
                  <Placeholder xs={3} className="me-3" />
                  <Placeholder xs={5} />
                </Placeholder>
              ))}
            </div>

            {/* Buttons Skeleton */}
            <div className="info-actions d-flex gap-3">
              <Placeholder.Button xs={4} aria-hidden="true" style={{ height: '45px', backgroundColor: '#eee', border: 'none' }} />
              <Placeholder.Button xs={3} aria-hidden="true" style={{ height: '45px', backgroundColor: '#eee', border: 'none' }} />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await getData(`product/${slug}`);
        const data = response?.data?.data || response?.data || response;
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  // 1. Render Skeleton instead of Spinner
  if (loading) {
    return <DetailsSkeleton />;
  }

  // Handle "Not Found" View
  if (!product) {
    return (
      <div className="details-page-wrapper text-center">
        <Container>
          <p className="mt-5">Product not found.</p>
          <Link to="/products" className="back-link">← Back to Products</Link>
        </Container>
      </div>
    );
  }

  const images = product.img && product.img.length > 0
      ? product.img
      : ["https://via.placeholder.com/600x500?text=No+Image"];

  return (
    <div className="details-page-wrapper">
      <Container>
        <div className="details-breadcrumb mb-4">
          <Link to="/products">Products</Link>
          <span className="crumb-sep">/</span>
          <span>{product.category?.title || "Collection"}</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-active">{product.title}</span>
        </div>

        <Row className="g-5">
          <Col lg={6} md={6} xs={12}>
            <div className="gallery-card">
              <div className="main-image-frame">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={images[activeImg]}
                    alt={product.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {product.highlight && (
                  <div className="category-badge">{product.highlight}</div>
                )}
              </div>

              {images.length > 1 && (
                <div className="thumb-row">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      className={`thumb-btn ${activeImg === i ? "active" : ""}`}
                      onClick={() => setActiveImg(i)}
                    >
                      <img src={img} alt={`${product.title}-${i}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Col>

          <Col lg={6} md={6} xs={12}>
            <motion.div
              className="info-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <small className="info-category">
                {product.category?.title || "Collection"}
              </small>

              <h1 className="info-title">{product.title}</h1>

              <div 
                className="info-content"
                dangerouslySetInnerHTML={{ __html: product.content || "No description available." }}
              />

              {product.specs && Array.isArray(product.specs) && product.specs.length > 0 && (
                <ul className="info-specs">
                  {product.specs.map((spec, i) => (
                    <li key={i}>
                      <span className="spec-label">{spec.label}</span>
                      <span className="spec-value">{spec.value}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="info-actions">
                <Link to="/contact" className="enquire-btn">
                  Enquire Now
                </Link>
                <Link to="/products" className="back-link">
                  ← Back to Products
                </Link>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}