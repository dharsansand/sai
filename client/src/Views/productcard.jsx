import { motion } from "framer-motion";
import { Card, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";

// --- 1. SKELETON VERSION OF THE CARD ---
export const ProductsCardSkeleton = () => {
  return (
    <Card className="product-main-card h-100 shadow-sm border-0">
      {/* Skeleton Image Area */}
      <div 
        className="placeholder-glow" 
        style={{ height: "220px", backgroundColor: "#f0f0f0", overflow: "hidden" }}
      >
        <div className="placeholder w-100 h-100"></div>
      </div>

      <Card.Body className="d-flex flex-column">
        {/* Skeleton Category */}
        <Placeholder as="small" animation="glow">
          <Placeholder xs={4} size="xs" className="mb-1" />
        </Placeholder>
        
        {/* Skeleton Title */}
        <Placeholder as={Card.Title} animation="glow" className="mb-2">
          <Placeholder xs={8} />
        </Placeholder>

        {/* Skeleton Description */}
        <Placeholder as={Card.Text} animation="glow" className="mb-3">
          <Placeholder xs={12} size="xs" />
          <Placeholder xs={10} size="xs" />
        </Placeholder>

        {/* Skeleton Footer */}
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Placeholder xs={3} size="sm" />
          <Placeholder xs={4} size="sm" />
        </div>
      </Card.Body>
    </Card>
  );
};

// --- 2. ACTUAL PRODUCT CARD ---
export default function ProductsCard({ product }) {
  const imageUrl = product.img && product.img.length > 0 
    ? product.img[0] 
    : "https://via.placeholder.com/500x400?text=No+Image";

  return (
    <motion.div
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="product-main-card h-100 shadow-sm border-0">
        <div className="card-img-container" style={{ height: "220px", overflow: "hidden", position: "relative" }}>
          <Card.Img 
            variant="top" 
            src={imageUrl} 
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
          {product.highlight && (
            <div className="category-badge" style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: 'rgba(212, 175, 55, 0.9)',
                color: 'white',
                padding: '2px 10px',
                borderRadius: '20px',
                fontSize: '0.7rem',
                fontWeight: 'bold'
            }}>
              {product.highlight}
            </div>
          )}
        </div>

        <Card.Body className="d-flex flex-column">
          <small className="text-muted text-uppercase mb-1" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
            {product.category?.title || "Collection"}
          </small>
          
          <Card.Title className="fw-bold h6 mb-2">
            {product.title}
          </Card.Title>

          <Card.Text className="text-muted small mb-3">
            {product.content?.length > 70 
              ? `${product.content.substring(0, 70)}...` 
              : product.content || "No description available"}
          </Card.Text>

          <div className="mt-auto d-flex justify-content-between align-items-center">
            <span className="fw-bold" style={{ color: '#333', fontSize: '0.9rem' }}>
              {/* Add price here if needed */}
            </span>
            
            <Link 
                to={`/productDetails/${product.slug}`} 
                className="text-decoration-none fw-bold" 
                style={{ color: '#d4af37', fontSize: '0.85rem' }}
            >
              Details →
            </Link>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
}