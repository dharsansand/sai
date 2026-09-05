import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetHomeCategoryQuery } from "../services/categoryHomeAPI";

// Skeleton Component
const CategorySkeleton = () => (
  <>
    {[1, 2, 3, 4].map((i) => (
      <div 
        key={i} 
        className="category-item-btn skeleton-loader" 
        style={{ width: "80px", height: "35px", background: "#eee", borderRadius: "20px", marginBottom: "5px" }}
      />
    ))}
  </>
);

export default function ProductCategory({ onSelect }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: apiCategories = [], isLoading } = useGetHomeCategoryQuery();

  // 1. Get whatever is after "/products/" from the URL
  // e.g. "/products/dfbfbrh5" -> "dfbfbrh5"
  // e.g. "/products" -> undefined
  const currentUrlParam = location.pathname.split("/")[2];

  // 2. Determine if "All" is active (no slug in URL)
  const isAllActive = !currentUrlParam || currentUrlParam === "All";

  const handleCategoryClick = (cat) => {
    if (cat === "All") {
      onSelect?.("All");
      navigate("/products");
    } else {
      onSelect?.(cat);
      // Navigate to cat.slug (or cat._id)
      navigate(`/products/${cat.slug || cat._id}`);
    }
  };

  // Find active category to show title on mobile
  const activeCategory = apiCategories.find(
    (c) => c.slug === currentUrlParam || c.title === currentUrlParam || c._id === currentUrlParam
  );
  const activeLabel = isAllActive ? "All" : (activeCategory?.title || currentUrlParam);

  return (
    <div className="category-sidebar-card">
      <h3 className="category-title">Collections</h3>
      
      <div className="mobile-category-header">
        <div className="mobile-active-label">
          <small>COLLECTION</small>
          <span>{activeLabel}</span>
        </div>

        <div className="category-list-wrapper">
          <div className="category-list-scroll">
            {isLoading ? (
              <CategorySkeleton />
            ) : (
              <>
                {/* 3. "All" Button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryClick("All")}
                  className={`category-item-btn ${isAllActive ? "active" : ""}`}
                >
                  All
                </motion.button>

                {/* 4. Dynamic Category Buttons */}
                {apiCategories.map((cat) => {
                  // Checks if cat.slug, cat.title, or cat._id matches the URL
                  const isActive = 
                    currentUrlParam === cat.slug || 
                    currentUrlParam === cat.title || 
                    currentUrlParam === cat._id;

                  return (
                    <motion.button
                      key={cat._id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCategoryClick(cat)}
                      className={`category-item-btn ${isActive ? "active" : ""}`}
                    >
                      {cat.title}
                    </motion.button>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}