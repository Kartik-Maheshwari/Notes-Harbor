import React from "react";
import Topnav from "../components/Topnav.jsx";
import Sidebar from "../components/Sidebar.jsx";

const HomePage = () => {
  return (
    <div className="flex h-screen ">
   
    <div className="w-1/5 bg-gray-200 justify-evenly ">
     <Sidebar/>
    </div>
    
    {/* Main Content */}
    <div className="flex flex-col w-full">
      {/* Topnav */}
      <div className="bg-blue-500 h-20 ">
        <Topnav/>
      </div>
      
      {/* Main Container */}
      <div className="flex flex-grow justify-center items-center bg-gray-100">
        {/* Your main content goes here */}
        <h1 className="text-3xl font-bold">Welcome to HandNotes</h1>
        
      </div>
    </div>
  </div>
  
  );
};

export default HomePage;
