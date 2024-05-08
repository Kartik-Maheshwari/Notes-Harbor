import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full w-48 flex flex-col justify-between">
      <div className="flex flex-col items-center mt-8">
        <span className="text-white text-lg font-semibold mb-4">NoteSharing</span>
        <button className="text-white bg-transparent hover:bg-white hover:text-gray-800 border border-white hover:border-transparent rounded px-3 py-1 transition-colors duration-300 mb-2">Home</button>
        <button className="text-white bg-transparent hover:bg-white hover:text-gray-800 border border-white hover:border-transparent rounded px-3 py-1 transition-colors duration-300 mb-2">Sign Up</button>
        <button className="text-white bg-transparent hover:bg-white hover:text-gray-800 border border-white hover:border-transparent rounded px-3 py-1 transition-colors duration-300 mb-2">Login</button>
        <button className="text-white bg-transparent hover:bg-white hover:text-gray-800 border border-white hover:border-transparent rounded px-3 py-1 transition-colors duration-300 mb-2">About</button>
      </div>
      <div className="flex justify-center mb-8">
        {/* Additional sidebar content can be added here */}
      </div>
    </div>
  );
};

export default Sidebar;
