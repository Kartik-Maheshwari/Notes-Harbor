// Layout.jsx

import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Topnav from "./Topnav"; // Import the new TopNav component
import axios from "axios";

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

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
      <Topnav isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> {/* Use the TopNav component */}
      <div className="flex flex-1 pt-10">
        <main className={`flex-grow p-4 overflow-y-auto transition-margin duration-300`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;