import React from "react";
import { motion } from "framer-motion";

export default function ProductCategory({ active, onSelect }) {
  const categories = ["All", "Electronics", "Fashion", "Lifestyle"];

  return (
    <div className="category-sidebar-card">
      <h3 className="category-title">Collections</h3>
      <div className="category-list">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`category-item-btn ${active === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}