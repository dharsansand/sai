
import '../css/homeabout/HomeAboute.css' 
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


export default function HomeAboute() {
  // Animation variants
  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="rb-about-section">
      <div className="rb-container">
        <div className="rb-about-grid">
          
          {/* LEFT: IMAGE WITH REACTBITS STYLE SPOTLIGHT EFFECT */}
          <motion.div 
            className="rb-image-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
          >
            <div className="rb-spotlight-card">
              <img 
                src="https://i.pinimg.com/736x/2c/bd/3a/2cbd3a8fad5594b5ba9e07b20c080ad4.jpg" 
                alt="About Us" 
                className="rb-main-img"
              />
              {/* Decorative Blur Element */}
              <div className="rb-blur-decoration"></div>
            </div>
          </motion.div>

          {/* RIGHT: TEXT WITH STAGGERED REVEAL */}
          <motion.div 
            className="rb-content-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
          >
            <span className="rb-tag">Discover Our Story</span>
            <h2 className="rb-title">
              Crafting Digital <span className="rb-gradient-text">Excellence</span>
            </h2>
            <p className="rb-description">
              We specialize in transforming complex ideas into elegant digital realities. 
              Our team combines technical precision with artistic vision to deliver 
              results that stand out in a crowded market.
            </p>

            <div className="rb-stats-row">
              <div className="rb-stat-item">
                <h4>99%</h4>
                <p>Satisfaction</p>
              </div>
              <div className="rb-stat-item">
                <h4>150+</h4>
                <p>Projects</p>
              </div>
            </div>

            <Link to="/about" className="rb-magnetic-button">
              <span>Read More</span>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor"></path></svg>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}