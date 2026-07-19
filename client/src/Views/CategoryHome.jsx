import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import "../css/homecategory/CategoryHome.css";

// Your 5 static items
const bannerData = [
  {
    id: 1,
    subtitle: "ESTABLISHED IN 1985",
    title: "Preserving the Divine Art of",
    highlight: "Metal Crafting",
    description: "Experience the fusion of tradition and precision with our handcrafted heritage metal artworks.",
    image: "https://images.unsplash.com/photo-1487088678257-3a541e6e3922?q=80&w=1074",
  },
  {
    id: 2,
    subtitle: "PREMIUM QUALITY",
    title: "Customized Sculptures for",
    highlight: "Modern Temples",
    description: "Tailor-made brass and copper installations that stand the test of time and devotion.",
    image: "https://images.unsplash.com/photo-1491466424936-e304919aada7?q=80&w=1169",
  },
  {
    id: 3,
    subtitle: "OUR HERITAGE",
    title: "Generations of Master",
    highlight: "Artisans",
    description: "Our craftsmen bring decades of experience to every hammer stroke and intricate detail.",
    image: "https://images.unsplash.com/photo-1507187632231-5beb21a654a2?q=80&w=1201",
  },
  {
    id: 4,
    subtitle: "SPIRITUAL ART",
    title: "Sacred Geometry in",
    highlight: "Bronze",
    description: "Intricate designs inspired by ancient scriptures and spiritual symbols.",
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1169",
  },
 
];

export default function CategoryHome() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section className="rb-cat-section">
      <div className="rb-cat-container">
        <div className="rb-cat-header">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "2px" }}
            whileInView={{ opacity: 1, letterSpacing: "5px" }}
            className="rb-cat-subtitle"
          >
            OUR COLLECTIONS
          </motion.span>
          <h2 className="rb-cat-main-title">Handcrafted <span>Heritage</span></h2>
        </div>

        <motion.div 
          className="rb-cat-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {bannerData.map((item) => (
            <motion.div 
              key={item.id} 
              className="rb-cat-card"
              variants={cardVariants}
              whileHover={{ y: -10 }}
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <div className="rb-cat-image-wrapper">
                <img src={item.image} alt={item.title} className="rb-cat-img" />
                <div className="rb-cat-badge">{item.subtitle}</div>
                <div className="rb-cat-overlay">
                   <div className="rb-cat-btn">View Details</div>
                </div>
              </div>

              <div className="rb-cat-content">
                <h3 className="rb-cat-title">
                  {item.title} <span className="rb-cat-highlight">{item.highlight}</span>
                </h3>
                <p className="rb-cat-desc">{item.description}</p>
                <div className="rb-cat-footer">
                  <span className="rb-cat-link">Explore Now</span>
                  <div className="rb-cat-dot"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}