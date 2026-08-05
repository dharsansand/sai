import { motion } from "framer-motion";
import { Card } from "react-bootstrap";

export default function ProductsCard({ product }) {
  return (
    <motion.div
      whileHover={{ y: -10, rotateY: 10, rotateX: 2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ perspective: "1000px" }}
    >
      <Card className="product-main-card h-100 shadow-sm">
        <div style={{ height: "220px", overflow: "hidden" }}>
          <Card.Img 
            variant="top" 
            src={product.image} 
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
        </div>
        <Card.Body className="d-flex flex-column">
          <small className="text-muted text-uppercase mb-1">{product.category}</small>
          <Card.Title className="fw-bold h5">{product.name}</Card.Title>
          <Card.Text className="text-muted small">
            {product.description.substring(0, 70)}...
          </Card.Text>
          <div className="mt-auto d-flex justify-content-between align-items-center">
            <span className="fw-bold text-dark">{product.price}</span>
            <motion.a 
                href="#" 
                whileHover={{ x: 5 }}
                className="text-decoration-none fw-bold" 
                style={{ color: '#d4af37' }}
            >
              Details →
            </motion.a>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
}