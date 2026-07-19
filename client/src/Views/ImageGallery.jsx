import React from 'react';
import { motion } from 'framer-motion';
import '../css/imageGallery/ImageGallery.css';

const images = [
  { id: 1, src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", size: "tall" },
  { id: 2, src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e", size: "wide" },
  { id: 3, src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", size: "square" },
  { id: 4, src: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad", size: "tall" },
  { id: 5, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb", size: "square" },
  { id: 6, src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7", size: "square" },
];

export default function ImageGallery() {
  return (
    <section className="gallery-wrapper">
      <div className="gallery-content">
        <motion.div 
          className="modern-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.3 }
            }
          }}
        >
          {images.map((item, index) => (
            <motion.div 
              key={item.id}
              className={`grid-item ${item.size}`}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <motion.div 
                className="image-card-inner"
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img src={item.src} alt="Art" className="gallery-photo" />
          
                <div className="glass-shine"></div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}