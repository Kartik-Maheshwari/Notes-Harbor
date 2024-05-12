import React from "react";
import Topnav from "../components/Topnav.jsx";
import Sidebar from "../components/Sidebar.jsx";
import MainPage from "./MainPage.jsx";

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen n">
      <div className="h-20 bg-black">
        <Topnav />
      </div>
      <div className="flex flex-1 h-fit ">
        <div className="w-1/6 h-full ">
          <Sidebar />
        </div>
        <div className="flex-1 h-full ">
          <MainPage />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
