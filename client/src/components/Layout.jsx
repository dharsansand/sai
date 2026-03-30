import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "../components/Sidebar/AppSidebar";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex" }}>
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      <div
        style={{
          marginLeft: collapsed ? 80 : 250,
          transition: "margin-left 200ms",
          width: "100%",
          padding: "20px",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
