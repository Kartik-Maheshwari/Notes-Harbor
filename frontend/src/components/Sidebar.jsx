import React from "react";
import { RiHome2Line, RiUserLine, RiSettings3Line } from 'react-icons/ri'; // Import React icons

const Sidebar = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full w-full flex flex-col justify-center">
      <div className="flex flex-col items-center mt-8">
        <span className="text-white text-lg font-semibold mb-4">NoteSharing</span>
        <div className="flex flex-col gap-2">
          <button className="text-white bg-transparent hover:bg-white hover:text-gray-800 border border-white hover:border-transparent rounded px-3 py-1 transition-colors duration-300 flex items-center">
            <RiHome2Line className="mr-2" /> Home
          </button>
          <button className="text-white bg-transparent hover:bg-white hover:text-gray-800 border border-white hover:border-transparent rounded px-3 py-1 transition-colors duration-300 flex items-center">
            <RiUserLine className="mr-2" /> Profile
          </button>
          <button className="text-white bg-transparent hover:bg-white hover:text-gray-800 border border-white hover:border-transparent rounded px-3 py-1 transition-colors duration-300 flex items-center">
            <RiSettings3Line className="mr-2" /> Settings
          </button>
        </div>
      </div>
      <div className="flex justify-center mb-8">
        {/* Additional sidebar content can be added here */}
      </div>
    </div>
  );
};

export default Sidebar;
