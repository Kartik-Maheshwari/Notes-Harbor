// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import {
  RiHome2Line,
  RiUserLine,
  RiSettings3Line,
  RiMenuLine,
} from "react-icons/ri"; // Import React icons
import { MdLeaderboard } from "react-icons/md";
import { useSelector } from "react-redux";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div
      className={`bg-gradient-to-r from-blue-500 to-purple-500 h-full ${
        isOpen ? "w-64" : "w-12"
      } flex flex-col transition-width duration-300`}
    >
      <div className="flex flex-col items-center mt-4">
        <button
          onClick={toggleSidebar}
          className="text-white hover:bg-white hover:text-gray-800 p-2 rounded transition-colors duration-300"
        >
          <RiMenuLine size={24} />
        </button>
        <span
          className={`text-white text-lg font-semibold mb-4 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          NoteSharing
        </span>
        <div className="flex flex-col gap-2 mt-4">
          <Link
            to="/"
            className="text-white bg-transparent hover:bg-white hover:text-gray-800 border border-white hover:border-transparent rounded px-3 py-1 transition-colors duration-300 flex items-center"
          >
            <RiHome2Line className="mr-2" />{" "}
            <span className={`${isOpen ? "block" : "hidden"}`}>Home</span>
          </Link>
          {isLoggedIn && (
            <Link
              to="/profile"
              className="text-white bg-transparent hover:bg-white hover:text-gray-800 border border-white hover:border-transparent rounded px-3 py-1 transition-colors duration-300 flex items-center"
            >
              <RiUserLine className="mr-2" />{" "}
              <span className={`${isOpen ? "block" : "hidden"}`}>Profile</span>
            </Link>
          )}
          {isLoggedIn && (
            <Link
              to="/settings"
              className="text-white bg-transparent hover:bg-white hover:text-gray-800 border border-white hover:border-transparent rounded px-3 py-1 transition-colors duration-300 flex items-center"
            >
              <RiSettings3Line className="mr-2" />{" "}
              <span className={`${isOpen ? "block" : "hidden"}`}>Settings</span>
            </Link>
          )}
          <Link
            to="/leaderboard"
            className="text-white bg-transparent hover:bg-white hover:text-gray-800 border border-white hover:border-transparent rounded px-3 py-1 transition-colors duration-300 flex items-center"
          >
            <MdLeaderboard className="mr-2" />{" "}
            <span className={`${isOpen ? "block" : "hidden"}`}>
              LeaderBoard
            </span>
          </Link>
        </div>
      </div>
      <div className="flex justify-center mb-8">
        {/* Additional sidebar content can be added here */}
      </div>
    </div>
  );
};

export default Sidebar;
