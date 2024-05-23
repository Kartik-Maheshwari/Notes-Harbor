// src/components/Layout.js
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Topnav from "./Topnav";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex flex-col h-screen">
      <Topnav />
      <div className="flex flex-1 pt-16">
        <aside
          className={`fixed top-16 bottom-0 overflow-y-auto transition-width duration-300 ${
            isSidebarOpen ? "w-64" : "w-12"
          }`}
        >
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </aside>
        <main
          className={`flex-grow p-4 overflow-y-auto transition-margin duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-12"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
