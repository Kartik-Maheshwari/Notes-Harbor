import React from "react";
import Topnav from "../components/Topnav.jsx";
import Sidebar from "../components/Sidebar.jsx";
import MainPage from "./MainPage.jsx";

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen n">
      <div className="h-20 fixed w-full   bg-black o">
        <Topnav />
      </div>
      <div className="flex    ">
        <div className="w-1/6 h-full fixed max-w-[20vw] ">
          <Sidebar />
        </div>
        <div className="flex h-full max-w-[80vw]   ml-96 ">
          <MainPage />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
