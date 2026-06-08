import  { useState } from "react";
import { Outlet } from "react-router-dom"; 
import AppSidebar from "./Sidebar/AppSidebar";

export default function Layout() { 
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

      <main className="content-with-sidebar" style={{ flexGrow: 1 }}>
        {/* <button className="mobile-menu-btn" onClick={() => setToggled(true)}>
          ☰
        </button> */}

        <Outlet /> 
      </main>
    </div>
  );
}