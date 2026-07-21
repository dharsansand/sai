import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* COLUMN 1: BRAND & SOCIALS */}
          <motion.div 
            className="footer-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="footer-logo">HERITAGE<span>ART</span></h2>
            <p className="footer-desc">
              Preserving the divine art of metal crafting through generations. 
              Quality and tradition in every masterpiece.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-icon"><FaInstagram /></a>
              <a href="#" className="social-icon"><FaFacebookF /></a>
              <a href="#" className="social-icon"><FaYoutube /></a>
            </div>
          </motion.div>

          {/* COLUMN 2: QUICK LINKS */}
          <motion.div 
            className="footer-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </motion.div>

          {/* COLUMN 3: MAP & CONTACT */}
          <motion.div 
            className="footer-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="footer-title">Find Us</h4>
            <div className="footer-map-wrapper">
              <iframe 
                title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.6630656237307!2d77.31943254297933!3d11.142466651103664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba907d677a830eb%3A0xb251a93e974f65bf!2sSRI%20SAIRAM%20SIRPASALAI!5e0!3m2!1sen!2sin!4v1784481207273!5m2!1sen!2sin"
                height="120" 
                style={{ border: 0, borderRadius: "12px" }} 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
            </div>
            <div className="footer-contact-info">
                <p><FaMapMarkerAlt /> 123 Heritage Lane, Metal City</p>
                <p><FaPhoneAlt /> +91 98765 43210</p>
            </div>
          </motion.div>

        </div>

        {/* BOTTOM BAR: COPYRIGHT */}
        <div className="footer-bottom">
          <div className="footer-line"></div>
          <div className="bottom-flex">
            <p>&copy; {currentYear} Heritage Art. All rights reserved.</p>
            <div className="bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}