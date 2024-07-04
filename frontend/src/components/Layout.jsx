// Layout.jsx

import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Topnav from "./Topnav";
import Sidebar from "./Sidebar";
import axios from "axios";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/v1/logout");
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Topnav isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
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
          <Outlet isLoggedIn={isLoggedIn} />
        </main>
      </div>
    </div>
  );
};

export default Layout;
