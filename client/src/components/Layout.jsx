import React, { useState } from "react";
import AppSidebar from "./Sidebar/AppSidebar";

export default function Layout({ children }) {

  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  return (
    <div style={{ display: "flex" }}>

      <AppSidebar
        collapsed={collapsed}
        toggled={toggled}
        setToggled={setToggled}
        onToggle={() => setCollapsed(!collapsed)}
      />

      <main className="content-with-sidebar">
        <button
          className="mobile-menu-btn"
          onClick={() => setToggled(true)}
        >
          ☰
        </button>

        {children}
      </main>

    </div>
  );
}