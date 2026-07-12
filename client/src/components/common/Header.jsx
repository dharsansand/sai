import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import "./Navbar.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/products", label: "Products" },
    { path: "/projects", label: "Projects" },
    { path: "/gallery", label: "Gallery" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}
      >
        <div className="navbar__container">
          {/* Logo */}
          <NavLink
            to="/"
            className="navbar__logo"
            onClick={closeMenu}
          >
            <div className="navbar__logo-text">
              Temple Crafts
            </div>

            <div className="navbar__logo-tagline">
              Heritage Metal Art
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="navbar__nav">
            <ul className="navbar__links">
              {navLinks.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "navbar__link navbar__link--active"
                        : "navbar__link"
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Actions */}
          <div className="navbar__actions">
            <NavLink
              to="/contact"
              className="navbar__cta"
            >
              Get Quote
            </NavLink>

            <button
              className="navbar__toggle"
              onClick={() => setMobileOpen(true)}
            >
              <HiMenuAlt3 />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}

            <motion.div
              className="navbar__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />

            {/* Sidebar */}

            <motion.aside
              className="navbar__mobile"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.35,
                ease: "easeInOut",
              }}
            >
              <div className="navbar__mobile-header">
                <div>
                  <div className="navbar__logo-text">
                    Temple Crafts
                  </div>

                  <div className="navbar__logo-tagline">
                    Heritage Metal Art
                  </div>
                </div>

                <button
                  className="navbar__close"
                  onClick={closeMenu}
                >
                  <HiX />
                </button>
              </div>

              <ul className="navbar__mobile-links">
                {navLinks.map((item, index) => (
                  <motion.li
                    key={item.path}
                    initial={{
                      opacity: 0,
                      x: 40,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        isActive
                          ? "navbar__mobile-link navbar__mobile-link--active"
                          : "navbar__mobile-link"
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <NavLink
                to="/contact"
                className="navbar__mobile-btn"
                onClick={closeMenu}
              >
                Get Quote
              </NavLink>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}