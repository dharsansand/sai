import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import '../css/banner/Banner.css';
import { useGetHomeBannersQuery } from '../services/bannerHomeApi';

const Banner = () => {
  const [current, setCurrent] = useState(0);

  const { data: banners = [], isLoading } = useGetHomeBannersQuery();

  const length = banners.length;

  const nextSlide = (e) => {
    e?.stopPropagation();
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = (e) => {
    e?.stopPropagation();
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // --- 2. SKELETON RENDER (Uses built-in isLoading) ---
  if (isLoading) {
    return (
      <div className="banner-skeleton">
        <div className="skeleton-content">
          <div className="sk-subtitle"></div>
          <div className="sk-title"></div>
          <div className="sk-title" style={{ width: '60%' }}></div>
          <div className="sk-description"></div>
          <div className="sk-button"></div>
        </div>
      </div>
    );
  }

  // If loading finished but no data found
  if (banners.length === 0) return null;

  const currentItem = banners[current];

  return (
    <section className="banner">
      <AnimatePresence mode='wait'>
        <motion.div 
          key={currentItem._id || current} 
          className="banner__slide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="banner__bg-wrapper">
             <div className="banner__overlay"></div>
             <motion.img 
                src={currentItem.banner?.[0]?.img || currentItem.image} 
                alt={currentItem.title} 
                className="banner__bg-image"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 4 }}
             />
          </div>

          <div className="banner__container">
            <div className="banner__content">
              <motion.span className="banner__subtitle" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: 0.2}}>
                {currentItem.subTitle}
              </motion.span>

              <motion.h1 className="banner__title" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: 0.4}}>
                {currentItem.title} <span className="highlight">{currentItem.highlight}</span>
              </motion.h1>

              <motion.p className="banner__description" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: 0.6}}>
                {currentItem.content}
              </motion.p>

              <motion.div className="banner__actions" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: 0.8}}>
                <button className="banner__btn-primary">Contact Us <HiArrowRight /></button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {length > 1 && (
        <>
          <div className="banner__nav">
            <button className="nav-btn" onClick={prevSlide} type="button">
              <HiChevronLeft />
            </button>
            <button className="nav-btn" onClick={nextSlide} type="button">
              <HiChevronRight />
            </button>
          </div>

          <div className="banner__dots">
            {banners.map((_, idx) => (
              <button 
                key={idx} 
                className={`dot ${idx === current ? 'active' : ''}`}
                onClick={() => setCurrent(idx)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Banner;