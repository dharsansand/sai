import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/products', label: 'Products' },
    { path: '/projects', label: 'Projects' },
  ];

  const serviceLinks = [
    { path: '/services', label: 'Temple Works' },
    { path: '/services', label: 'Custom Designs' },
    { path: '/services', label: 'Restoration' },
    { path: '/services', label: 'Consultation' },
  ];

  const socialLinks = [
    { icon: FaFacebookF, url: '#', label: 'Facebook' },
    { icon: FaInstagram, url: '#', label: 'Instagram' },
    { icon: FaYoutube, url: '#', label: 'YouTube' },
    { icon: FaLinkedinIn, url: '#', label: 'LinkedIn' },
    { icon: FaWhatsapp, url: '#', label: 'WhatsApp' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="footer">
      <div className="footer__pattern" />

      <motion.div
        className="footer__container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="footer__grid">
          {/* Company Info */}
          <motion.div className="footer__section footer__section--info" variants={itemVariants}>
            <Link to="/" className="footer__logo">
              <span className="footer__logo-text">Temple Crafts</span>
              <span className="footer__logo-tagline">Heritage Metal Art</span>
            </Link>
            <p className="footer__description">
              Preserving centuries of South Indian temple metal craftsmanship tradition,
              creating sacred masterpieces that stand the test of time.
            </p>
            <div className="footer__social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="footer__social-link"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="footer__section" variants={itemVariants}>
            <h4 className="footer__title">Quick Links</h4>
            <ul className="footer__links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div className="footer__section" variants={itemVariants}>
            <h4 className="footer__title">Our Services</h4>
            <ul className="footer__links">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div className="footer__section" variants={itemVariants}>
            <h4 className="footer__title">Contact Us</h4>
            <ul className="footer__contact">
              <li className="footer__contact-item">
                <FaMapMarkerAlt className="footer__contact-icon" />
                <span>Kerala, Tamil Nadu, India</span>
              </li>
              <li className="footer__contact-item">
                <FaPhone className="footer__contact-icon" />
                <a href="tel:+911234567890">+91 123 456 7890</a>
              </li>
              <li className="footer__contact-item">
                <FaEnvelope className="footer__contact-icon" />
                <a href="mailto:info@templecrafts.com">info@templecrafts.com</a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="footer__divider" />

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} Temple Crafts. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <a href="#" className="footer__bottom-link">Privacy Policy</a>
            <a href="#" className="footer__bottom-link">Terms of Service</a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
