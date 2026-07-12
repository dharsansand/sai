import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import './PrimaryButton.css';

const PrimaryButton = ({
  text,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'medium',
  icon = false,
  fullWidth = false,
  className = '',
  type = 'button',
}) => {
  const variantClass = `primary-btn--${variant}`;
  const sizeClass = `primary-btn--${size}`;
  const widthClass = fullWidth ? 'primary-btn--full' : '';
  const iconClass = icon ? 'primary-btn--icon' : '';

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  const arrowVariants = {
    rest: { x: 0 },
    hover: { x: 5 },
  };

  const content = (
    <>
      <span className="primary-btn__text">{text}</span>
      {icon && (
        <motion.span
          className="primary-btn__icon"
          variants={arrowVariants}
        >
          <FaArrowRight />
        </motion.span>
      )}
    </>
  );

  if (to && !href) {
    return (
      <motion.div
        variants={buttonVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
      >
        <Link
          to={to}
          className={`primary-btn ${variantClass} ${sizeClass} ${widthClass} ${iconClass} ${className}`}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.div
        variants={buttonVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
      >
        <a
          href={href}
          className={`primary-btn ${variantClass} ${sizeClass} ${widthClass} ${iconClass} ${className}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`primary-btn ${variantClass} ${sizeClass} ${widthClass} ${iconClass} ${className}`}
      variants={buttonVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      {content}
    </motion.button>
  );
};

export default PrimaryButton;
