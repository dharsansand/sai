import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Counter.css';

const Counter = ({ end, duration = 2000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration]);

  return (
    <motion.span
      ref={counterRef}
      className="counter"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <span className="counter__prefix">{prefix}</span>
      <span className="counter__number">{count}</span>
      <span className="counter__suffix">{suffix}</span>
    </motion.span>
  );
};

const CounterItem = ({ icon: Icon, count, suffix, prefix, label }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="counter-item"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {Icon && (
        <div className="counter-item__icon-wrapper">
          <Icon className="counter-item__icon" />
        </div>
      )}
      <div className="counter-item__content">
        <Counter end={count} suffix={suffix} prefix={prefix} />
        <span className="counter-item__label">{label}</span>
      </div>
    </motion.div>
  );
};

Counter.Item = CounterItem;

export default Counter;
