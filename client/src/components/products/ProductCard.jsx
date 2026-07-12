import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({
  image,
  title,
  category,
  description,
  link = '/products',
  index = 0,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.article
      className="product-card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -10 }}
    >
      <div className="product-card__image-wrapper">
        <img src={image} alt={title} className="product-card__image" />
        <div className="product-card__overlay" />
      </div>

      <div className="product-card__content">
        {category && (
          <span className="product-card__category">{category}</span>
        )}
        <h3 className="product-card__title">{title}</h3>
        {description && (
          <p className="product-card__description">{description}</p>
        )}
        <Link to={link} className="product-card__link">
          <span>View Details</span>
          <FaArrowRight className="product-card__link-icon" />
        </Link>
      </div>

      <div className="product-card__badge">
        <span>Craft</span>
      </div>
    </motion.article>
  );
};

export default ProductCard;
