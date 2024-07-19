import React from "react";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="w-full h-full p-4 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 h-full">
        <div className="bg-blue-200 shadow-md rounded-lg p-6 hover:bg-blue-300 transform hover:scale-105 transition-all duration-300 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-2">Manage Uploads</h2>
            <p className="text-sm text-gray-600 mb-4">Review and manage your uploads here.</p>
          </div>
          <Link to="/settings/uploads" className="text-blue-500 hover:text-blue-700">Edit</Link>
        </div>
        <div className="bg-green-200 shadow-md rounded-lg p-6 hover:bg-green-300 transform hover:scale-105 transition-all duration-300 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-2">Manage Followers</h2>
            <p className="text-sm text-gray-600 mb-4">See who is following you.</p>
          </div>
          <Link to="/settings/followers" className="text-blue-500 hover:text-blue-700">Edit</Link>
        </div>
        <div className="bg-yellow-200 shadow-md rounded-lg p-6 hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-2">Manage Following</h2>
            <p className="text-sm text-gray-600 mb-4">Manage the people you are following.</p>
          </div>
          <Link to="/settings/following" className="text-blue-500 hover:text-blue-700">Edit</Link>
        </div>
        <div className="bg-red-200 shadow-md rounded-lg p-6 hover:bg-red-300 transform hover:scale-105 transition-all duration-300 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-2">Account Settings</h2>
            <p className="text-sm text-gray-600 mb-4">Update your account settings here.</p>
          </div>
          <Link to="/settings/account-settings" className="text-blue-500 hover:text-blue-700">Edit</Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
