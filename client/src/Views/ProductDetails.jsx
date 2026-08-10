import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams, useLocation } from "react-router-dom";

import "../css/product/productdetails.css";
import { getData } from "../Api/apiRequest";

export default function ProductDetails() {
  const { slug } = useParams();
  const location = useLocation();

  // If we navigated here from ProductsCard, the full product is already
  // sitting in location.state — use it immediately, no fetch/flash needed.
  const passedProduct = location.state?.product || null;

  const [product, setProduct] = useState(passedProduct);
  const [loading, setLoading] = useState(!passedProduct);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    // Reset gallery whenever we land on a different product
    setActiveImg(0);

    // If we already have the product from navigation state and it matches
    // the current slug, skip the network call entirely.
    if (passedProduct && passedProduct.slug === slug) {
      setProduct(passedProduct);
      setLoading(false);
      return;
    }

    // Otherwise (direct URL visit, refresh, or shared link) fetch it.
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await getData(`product/${slug}`);
        const data = response?.data?.data || response?.data || response;
        setProduct(data || null);
      } catch (error) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (loading) {
    return (
      <div className="details-page-wrapper d-flex align-items-center justify-content-center">
        <Spinner animation="border" style={{ color: "#d4af37" }} />
      </div>
    );
  }

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

  const images =
    product.img && product.img.length > 0
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

              <p className="info-content">
                {product.content || "No description available for this product."}
              </p>

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