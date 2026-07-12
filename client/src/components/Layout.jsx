import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import AppSidebar from "./Sidebar/AppSidebar";
import "./layout.css";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;

      setIsMobile(mobile);

      if (!mobile) {
        setMobileOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSidebarToggle = () => {
    if (isMobile) {
      setMobileOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="layout">
      <AppSidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        isMobile={isMobile}
        onToggle={handleSidebarToggle}
        setMobileOpen={setMobileOpen}
      />

      <main
        className={`main-content ${
          !isMobile
            ? collapsed
              ? "collapsed-content"
              : "expanded-content"
            : ""
        }`}
      >
 <div className="menu_btn_box">
{isMobile && (
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(true)}
          >
            <FaBars />
          </button>
        )}
      </div>

        <Outlet />
      </main>
      
             
    </div>
  );
}