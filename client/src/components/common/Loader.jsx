import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="tc_loader_wrapper">
      <div className="tc_loader_core">
        {/* Rotating dashed ring */}
        <div className="tc_ring">
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className="tc_ring_tick"
              style={{ transform: `rotate(${i * 22.5}deg)` }}
            ></span>
          ))}
        </div>

        {/* Temple Icon Assembling */}
        <svg className="tc_icon" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="tc_gold_grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8a611f" />
              <stop offset="50%" stopColor="#f3d693" />
              <stop offset="100%" stopColor="#8a611f" />
            </linearGradient>
          </defs>

          {/* Temple Top/Kalasam */}
          <path className="tc_part tc_p_top" d="M50 5 L58 18 H42 L50 5 Z" />
          {/* Temple Roof */}
          <path className="tc_part tc_p_roof" d="M25 45 L50 20 L75 45 H25 Z" />
          {/* Pillars */}
          <rect className="tc_part tc_p_pillar_l" x="30" y="45" width="8" height="35" rx="1" />
          <rect className="tc_part tc_p_pillar_r" x="62" y="45" width="8" height="35" rx="1" />
          {/* Base */}
          <rect className="tc_part tc_p_base" x="20" y="80" width="60" height="10" rx="2" />
        </svg>
      </div>

      <div className="tc_brand_reveal">
        <h1 className="tc_brand_name">TEMPLE</h1>
        <span className="tc_brand_sub">CRAFTS</span>
      </div>
    </div>
  );
};

export default Loader;