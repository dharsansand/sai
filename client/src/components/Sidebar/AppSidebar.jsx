import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import "./sidebar.css";
import { IoCloseCircle } from "react-icons/io5";

export default function AppSidebar({
  collapsed,
  mobileOpen,
  isMobile,
  onToggle,
  setMobileOpen,
}) {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ||
    location.pathname.startsWith(path + "/");

  const handleMenuClick = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${mobileOpen ? "show" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={`sidebar ${
          !isMobile && collapsed ? "collapsed" : ""
        } ${isMobile && mobileOpen ? "mobile-open" : ""}`}
      >
        <div className="sidebar-header">
          <h2>{collapsed && !isMobile ? "AP" : "Admin Panel"}</h2>

          <button className="collapse-btn" onClick={onToggle}>
            <IoCloseCircle />
          </button>
        </div>

        <ul className="sidebar-menu">
          <li className={isActive("/admin/dashboard") ? "active" : ""}>
            <Link to="/admin/dashboard" onClick={handleMenuClick}>
              <FaHome />
              {(!collapsed || isMobile) && <span>Dashboard</span>}
            </Link>
          </li>

          <li className={isActive("/admin/branner") ? "active" : ""}>
            <Link to="/admin/branner" onClick={handleMenuClick}>
              <MdCategory />
              {(!collapsed || isMobile) && <span>Branner</span>}
            </Link>
          </li>

             <li className={isActive("/admin/category") ? "active" : ""}>
            <Link to="/admin/category" onClick={handleMenuClick}>
              <MdCategory />
              {(!collapsed || isMobile) && <span>Category</span>}
            </Link>
          </li>

            <li className={isActive("/admin/product") ? "active" : ""}>
            <Link to="/admin/product" onClick={handleMenuClick}>
              <MdCategory />
              {(!collapsed || isMobile) && <span>Product</span>}
            </Link>
          </li>


          <li className={isActive("/admin/user") ? "active" : ""}>
            <Link to="/admin/user" onClick={handleMenuClick}>
              <MdCategory />
              {(!collapsed || isMobile) && <span>User</span>}
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}