import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import "../css/homecategory/CategoryHome.css";
import { getData } from '../Api/apiRequest';
import { useGetHomeCategoryQuery } from '../services/categoryHomeAPI';

export default function CategoryHome() {
  const navigate = useNavigate();



  const { data: CategoryData = [], loading } = useGetHomeCategoryQuery({ limit: 4 });

  const SkeletonCard = () => (
    <div className="rb-cat-card skeleton">
      <div className="rb-cat-image-wrapper">
        <div className="rb-skeleton-shimmer sk-img"></div>
      </div>

      <div className="rb-cat-content">
        <div className="rb-skeleton-shimmer sk-title"></div>
        <div className="rb-skeleton-shimmer sk-desc"></div>
        <div
          className="rb-skeleton-shimmer sk-desc"
          style={{ width: "80%" }}
        ></div>
        <div className="rb-skeleton-shimmer sk-footer"></div>
      </div>
    </div>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section className="rb-cat-section">
      <div className="rb-cat-container">
        <div className="rb-cat-header">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "2px" }}
            whileInView={{ opacity: 1, letterSpacing: "5px" }}
            className="rb-cat-subtitle"
          >
            OUR COLLECTIONS
          </motion.span>

          <h2 className="rb-cat-main-title">
            Handcrafted <span>Heritage</span>
          </h2>
        </div>

        <motion.div
          className="rb-cat-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {loading ? (
            [...Array(4)].map((_, index) => <SkeletonCard key={index} />)
          ) : (
            CategoryData.map((item) => {
              const imageSource =
                item.img && item.img[0]
                  ? typeof item.img[0] === "object"
                    ? item.img[0].img
                    : item.img[0]
                  : "";

              return (
                <motion.div
                  key={item.slug}
                  className="rb-cat-card"
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                 onClick={() => {
    navigate(`/products/${item.slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scrolls smoothly to top
  }}
                >
                  <div className="rb-cat-image-wrapper">
                    <img
                      src={imageSource}
                      alt={item.title}
                      className="rb-cat-img"
                     
                    />

                    <div className="rb-cat-badge">
                      {item.subTitle || "New"}
                    </div>

                    <div className="rb-cat-overlay">
                      <div className="rb-cat-btn">View Details</div>
                    </div>
                  </div>

                  <div className="rb-cat-content">
                    <h3 className="rb-cat-title">
                      {item.title}
                      <span className="rb-cat-highlight">
                        {item.highlight}
                      </span>
                    </h3>

                    <p className="rb-cat-desc">{item.content}</p>

                    <div className="rb-cat-footer">
                      <span className="rb-cat-link">
                        Explore Now
                      </span>
                      <div className="rb-cat-dot"></div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>
      </div>
    </section>
  );
}