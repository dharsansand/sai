  import React from "react";
  import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
  import { Link, useLocation } from "react-router-dom";
  import { FaHome, FaUsers, FaBlog, FaUserTie } from "react-icons/fa";
  import { RiGalleryLine } from "react-icons/ri";
  import { MdCategory, MdOutlineContactMail } from "react-icons/md";
  import "./sidebar.css";

  export default function AppSidebar({ collapsed, onToggle }) {

    const location = useLocation();

    const isActive = (path) => {
      if (!path) return false;
      return location.pathname === path || location.pathname.startsWith(path + "/");
    };

    return (
      <Sidebar
        collapsed={collapsed}
        transitionDuration={200}
        backgroundColor="#0f172a"
        style={{ height: "100vh", position: "fixed", left: 0, top: 0 }}
      >
        <div className="sidebar-logo">
          {!collapsed ? (
            <h2 className="logo-text">Admin Panel</h2>
          ) : (
            <h3 className="logo-mini">AP</h3>
          )}
        </div>

        <Menu
          menuItemStyles={{
            button: {
              "&.ps-active": {
                backgroundColor: "#1f2937",
                color: "#fff",
              },
            },
          }}
        >
          <MenuItem active={isActive("/admin/dashboard")} icon={<FaHome />} component={<Link to="/admin/dashboard" />}>
            Dashboard
          </MenuItem>

          

          {/* <MenuItem active={isActive("/admin/blog")} icon={<FaBlog />} component={<Link to="/admin/blog" />}>
            Blog
          </MenuItem>

          <MenuItem active={isActive("/admin/gallery")} icon={<RiGalleryLine />} component={<Link to="/admin/gallery" />}>
            Gallery
          </MenuItem>

          <MenuItem active={isActive("/admin/contact")} icon={<MdOutlineContactMail />} component={<Link to="/admin/contact" />}>
            Contact
          </MenuItem> */}

          {/* <MenuItem active={isActive("/admin/career")} icon={<FaUserTie />} component={<Link to="/admin/career" />}>
            Career
          </MenuItem> */}

          {/* <SubMenu icon={<MdCategory />} label="Category">
            <MenuItem active={isActive("/admin/category")} component={<Link to="/admin/category" />}>
              Category
            </MenuItem>
            <MenuItem active={isActive("/admin/categorydetails")} component={<Link to="/admin/categorydetails" />}>
              Category Details
            </MenuItem>
          </SubMenu> */}

          {/* <SubMenu icon={<MdCategory />} label="Brand">
            <MenuItem active={isActive("/admin/brand")} component={<Link to="/admin/brand" />}>
              Brand Category
            </MenuItem>
            <MenuItem active={isActive("/admin/brandlist")} component={<Link to="/admin/brandlist" />}>
              Brand List
            </MenuItem>
          </SubMenu> */}
 <MenuItem active={isActive("/admin/branner")} icon={<MdCategory />} component={<Link to="/admin/branner" />}>
            Branner
          </MenuItem>
          <MenuItem active={isActive("/admin/user")} icon={<MdCategory />} component={<Link to="/admin/user" />}>
            user
          </MenuItem>

         
        </Menu>

        <div className="sidebar-footer">
          <button className="sidebar-toggle" onClick={onToggle}>
            {collapsed ? "Open" : "Close"}
          </button>
        </div>
      </Sidebar>
    );
  }
