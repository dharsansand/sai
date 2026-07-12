import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import './Hero.css';

const Hero = ({
  title,
  subtitle,
  description,
  primaryBtnText,
  primaryBtnLink,
  secondaryBtnText,
  secondaryBtnLink,
  backgroundImage,
  align = 'left',
  showScrollIndicator = false,
}) => {
  const alignClass = `hero--${align}`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      className={`hero ${alignClass}`}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : {}
      }
    >
      <div className="hero__overlay" />

      {backgroundImage && <div className="hero__pattern" />}

      <motion.div
        className="hero__container container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero__content">
          <motion.span className="hero__subtitle" variants={itemVariants}>
            {subtitle}
          </motion.span>

          <motion.h1 className="hero__title" variants={itemVariants}>
            {title}
          </motion.h1>

          {description && (
            <motion.p className="hero__description" variants={itemVariants}>
              {description}
            </motion.p>
          )}

          <motion.div className="hero__buttons" variants={itemVariants}>
            {primaryBtnText && (
              <Link to={primaryBtnLink || '/contact'} className="hero__btn hero__btn--primary">
                {primaryBtnText}
              </Link>
            )}
            {secondaryBtnText && (
              <Link
                to={secondaryBtnLink || '/about'}
                className="hero__btn hero__btn--secondary"
              >
                {secondaryBtnText}
              </Link>
            )}
          </motion.div>
        </div>
      </motion.div>

      {showScrollIndicator && (
        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <FaChevronDown className="hero__scroll-icon" />
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
