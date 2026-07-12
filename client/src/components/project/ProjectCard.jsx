import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import './ProjectCard.css';

const ProjectCard = ({
  image,
  title,
  location,
  year,
  category,
  description,
  link = '/projects',
  index = 0,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.article
      className="project-card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8 }}
    >
      <div className="project-card__image-wrapper">
        <img src={image} alt={title} className="project-card__image" />
        <div className="project-card__overlay" />
        <div className="project-card__meta">
          {location && (
            <span className="project-card__meta-item">
              <FaMapMarkerAlt />
              <span>{location}</span>
            </span>
          )}
          {year && (
            <span className="project-card__meta-item">
              <FaCalendarAlt />
              <span>{year}</span>
            </span>
          )}
        </div>
      </div>

      <div className="project-card__content">
        <div className="project-card__header">
          {category && (
            <span className="project-card__category">{category}</span>
          )}
          <h3 className="project-card__title">{title}</h3>
        </div>

        {description && (
          <p className="project-card__description">{description}</p>
        )}

        <Link to={link} className="project-card__link">
          <span>View Project</span>
          <FaArrowRight className="project-card__link-icon" />
        </Link>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
