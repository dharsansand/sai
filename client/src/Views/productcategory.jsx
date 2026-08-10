import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getData } from "../Api/apiRequest";

// --- Skeleton Component for Category Buttons ---
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

export default function ProductCategory({ active, onSelect }) {
  const [apiCategories, setApiCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 1. Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await getData("category");
        const data = response?.data || response;
        
        if (Array.isArray(data)) {
          setApiCategories(data);
        } else if (data?.data) {
          setApiCategories(data.data);
        }
      } catch (error) { 
        console.error(error); 
      } finally {
        setIsLoading(false); // 2. Stop loading
      }
    };
    fetchCategory();
  }, []);

  const handleCategoryClick = (cat) => {
    if (cat === "All") {
      onSelect("All");
      navigate("/products");
    } else {
      onSelect(cat.title);
      navigate(`/products/${cat.slug}`);
    }
  };

  return (
    <div className="category-sidebar-card">
      <h3 className="category-title">Collections</h3>
      
      <div className="mobile-category-header">
        <div className="mobile-active-label">
          <small>COLLECTION</small>
          <span>{active}</span>
        </div>

        <div className="category-list-wrapper">
          <div className="category-list-scroll">
            {/* 3. Conditional Rendering for Skeletons */}
            {isLoading ? (
              <CategorySkeleton />
            ) : (
              <>
                {/* All Button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryClick("All")}
                  className={`category-item-btn ${active === "All" ? "active" : ""}`}
                >
                  All
                </motion.button>

                {/* Dynamic Buttons */}
                {apiCategories.map((cat) => (
                  <motion.button
                    key={cat._id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategoryClick(cat)}
                    className={`category-item-btn ${active === cat.title ? "active" : ""}`}
                  >
                    {cat.title}
                  </motion.button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}