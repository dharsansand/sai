import { motion } from 'framer-motion';
import './Timeline.css';

const TimelineItem = ({ year, title, description, icon: Icon, index }) => {
  const itemVariants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2,
      },
    },
  };

  return (
    <motion.div
      className="timeline__item"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <div className="timeline__card">
        <div className="timeline__header">
          <span className="timeline__year">{year}</span>
          {Icon && (
            <div className="timeline__icon-wrapper">
              <Icon className="timeline__icon" />
            </div>
          )}
        </div>
        <h3 className="timeline__title">{title}</h3>
        <p className="timeline__description">{description}</p>
      </div>
      <div className="timeline__marker">
        <span className="timeline__dot" />
        <span className="timeline__line" />
      </div>
    </motion.div>
  );
};

const Timeline = ({ items = [] }) => {
  return (
    <div className="timeline">
      <div className="timeline__line-center" />
      <div className="timeline__container">
        {items.map((item, index) => (
          <TimelineItem
            key={item.id || index}
            {...item}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

Timeline.Item = TimelineItem;

export default Timeline;
