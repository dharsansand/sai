import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="custom-header">
      <div className="header-logo">
        {/* <span className="maple-icon">🍁</span> */}
        {/* <span className="logo-text">maples</span> */}
      </div>

      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <div className="nav-item">Products ▾</div>
        <div className="nav-item">Spaces ▾</div>
        <div className="nav-item">Resources ▾</div>
        <div className="nav-item">Contact ▾</div>
      </nav>

      {/* <div className="header-right">
        <span className="tagline">WORLD CLASS FURNITURE</span>
        <div className="header-icons">
          <span className="icon search-icon">🔍</span>
          <span className="icon menu-icon">≡</span>
        </div>
      </div> */}
    </header>
  );
};

export default Header;