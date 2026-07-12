import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import '../css/banner/Banner.css';

const bannerData = [
  {
    id: 1,
    subtitle: "ESTABLISHED IN 1985",
    title: "Preserving the Divine Art of",
    highlight: "Metal Crafting",
    description: "Experience the fusion of tradition and precision with our handcrafted heritage metal artworks.",
    image: "https://images.unsplash.com/photo-1487088678257-3a541e6e3922?q=80&w=1074",
  },
  {
    id: 2,
    subtitle: "PREMIUM QUALITY",
    title: "Customized Sculptures for",
    highlight: "Modern Temples",
    description: "Tailor-made brass and copper installations that stand the test of time and devotion.",
    image: "https://images.unsplash.com/photo-1491466424936-e304919aada7?q=80&w=1169",
  },
  {
    id: 3,
    subtitle: "OUR HERITAGE",
    title: "Generations of Master",
    highlight: "Artisans",
    description: "Our craftsmen bring decades of experience to every hammer stroke and intricate detail.",
    image: "https://images.unsplash.com/photo-1507187632231-5beb21a654a2?q=80&w=1201",
  }
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const length = bannerData.length;

  const nextSlide = (e) => {
    e?.stopPropagation(); // Prevent the click from affecting other layers
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = (e) => {
    e?.stopPropagation(); // Prevent the click from affecting other layers
    setCurrent(current === 0 ? length - 1 : current - 1); // Fixed: current - 1
  };

  return (
    <section className="banner">
      <AnimatePresence mode='wait'>
        <motion.div 
          key={current} 
          className="banner__slide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="banner__bg-wrapper">
             <div className="banner__overlay"></div>
             <motion.img 
                src={bannerData[current].image} 
                alt="banner" 
                className="banner__bg-image"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 4 }}
             />
          </div>

          <div className="banner__container">
            <div className="banner__content">
              <motion.span className="banner__subtitle" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: 0.2}}>
                {bannerData[current].subtitle}
              </motion.span>
              <motion.h1 className="banner__title" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: 0.4}}>
                {bannerData[current].title} <span className="highlight">{bannerData[current].highlight}</span>
              </motion.h1>
              <motion.p className="banner__description" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: 0.6}}>
                {bannerData[current].description}
              </motion.p>
              <motion.div className="banner__actions" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: 0.8}}>
                <button className="banner__btn-primary">Contact Us <HiArrowRight /></button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* FIXED NAVIGATION AREA */}
      <div className="banner__nav">
        <button 
          className="nav-btn" 
          onClick={(e) => prevSlide(e)}
          type="button"
        >
          <HiChevronLeft />
        </button>
        <button 
          className="nav-btn" 
          onClick={(e) => nextSlide(e)}
          type="button"
        >
          <HiChevronRight />
        </button>
      </div>

      <div className="banner__dots">
        {bannerData.map((_, idx) => (
          <button 
            key={idx} 
            className={`dot ${idx === current ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;