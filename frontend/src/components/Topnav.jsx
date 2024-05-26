// src/components/Topnav.js
import React, { useState } from "react";
import {
  RiSearchLine,
  RiUserLine,
  RiSettingsLine,
  RiMenuLine,
} from "react-icons/ri";

const Topnav = () => {
  const [search, setSearch] = useState("");
  const [placeholder, setPlaceholder] = useState(""); // Placeholder state for the search input
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchSubmit = (e) => {
    e.preventDefault();
    // Add search functionality here
  };

  const menuClickHandler = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 z-10 p-4 flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center">
        <p className="text-white font-bold">HandNotes</p>
      </div>

      {/* Center section */}
      <div className="hidden md:flex items-center w-full max-w-md mx-auto">
        <form className="flex items-center w-full" onSubmit={searchSubmit}>
          <input
            type="text"
            placeholder={`Search for notes ${placeholder}`}
            className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 flex items-center bg-gray-800 text-white rounded-full p-2"
          >
            <RiSearchLine className="text-white" />
          </button>
        </form>
      </div>

      {/* Right section */}
      <div className="flex items-center">
        <img
          src="pfDefaultPic.png" // Placeholder image
          alt="Profile"
          className="cursor-pointer w-8 h-8 rounded-full"
          onClick={menuClickHandler}
        />
        <RiUserLine className="text-white ml-4 cursor-pointer hidden md:block" />
        <RiSettingsLine className="text-white ml-4 cursor-pointer hidden md:block" />
        <button
          className="text-white ml-4 md:hidden"
          onClick={menuClickHandler}
        >
          <RiMenuLine size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col items-center md:hidden">
          <div className="w-full p-4">
            <form className="flex items-center w-full" onSubmit={searchSubmit}>
              <input
                type="text"
                placeholder={`Search for notes ${placeholder}`}
                className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                className="ml-2 flex items-center bg-gray-800 text-white rounded-full p-2"
              >
                <RiSearchLine className="text-white" />
              </button>
            </form>
          </div>
          <div className="flex flex-col items-center">
            <RiUserLine className="text-white cursor-pointer my-2" />
            <RiSettingsLine className="text-white cursor-pointer my-2" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Topnav;
