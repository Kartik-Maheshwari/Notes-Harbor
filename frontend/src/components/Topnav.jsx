import React from "react";
import { useState } from "react";
import { RiSearchLine, RiUserLine, RiSettingsLine } from 'react-icons/ri'; // Import React icons

const Topnav = () => {
  const [search, setSearch] = useState("");
  const [placeholder, setPlaceholder] = useState(""); // Placeholder state for the search input
  
  const searchSubmit = (e) => {
    e.preventDefault();
    // Add search functionality here
  };

  const menuClickHandler = () => {
    // Add menu click functionality here
  };

  return (
    <div className="flex-col gap-50  justify-evenly w-full">
      <div className="topbar p-4 flex  items-center">
        {/* Left section */}
        <div className="flex items-center">
          <p className="text-white font-bold   mr-56">HandNotes</p>
        </div>

        {/* Center section */}
        <div className="flex items-center w-40 flex-grow">
          <form className="flex items-center" onSubmit={searchSubmit}>
            <input
              type="text"
              placeholder={`Search for notes ${placeholder}`}
              className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="ml-2 flex items-center bg-gray-800 text-white rounded-full p-2">
              <RiSearchLine className="text-white" />
            </button>
          </form>
        </div>

        {/* Right section */}
        <div className="flex items-center">
          <img
            src="pfDefaultPic.png" // Placeholder image
            alt="Profile"
            className="cursor-pointer"
            onClick={menuClickHandler}
          />
          <RiUserLine className="text-white ml-4 cursor-pointer" />
          <RiSettingsLine className="text-white ml-4 cursor-pointer" />
        </div>
      </div>

      <div className="menu" style={{ height: "100vh" }}>
        {/* Menu content */}
      </div>
    </div>
  );
};

export default Topnav;
