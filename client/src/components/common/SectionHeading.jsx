import { motion } from 'framer-motion';
import './SectionHeading.css';

const SectionHeading = ({
  subtitle,
  title,
  description,
  align = 'center',
  light = false,
}) => {
  const alignClass = `section-heading--${align}`;
  const lightClass = light ? 'section-heading--light' : '';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={`section-heading ${alignClass} ${lightClass}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {subtitle && (
        <motion.span className="section-heading__subtitle" variants={itemVariants}>
          {subtitle}
        </motion.span>
      )}

      <motion.h2 className="section-heading__title" variants={itemVariants}>
        {title}
      </motion.h2>

      {description && (
        <motion.p className="section-heading__description" variants={itemVariants}>
          {description}
        </motion.p>
      )}

      <motion.div className="section-heading__decoration" variants={itemVariants}>
        <span className="section-heading__line" />
        <span className="section-heading__dot" />
        <span className="section-heading__line" />
      </motion.div>
    </motion.div>
  );
};

export default SectionHeading;
