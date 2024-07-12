import React from "react";

const ProfileSection = () => {
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="profile-section flex flex-col justify-center items-center md:flex-row md:justify-between md:items-center bg-slate-600 p-3 py-5 rounded-lg">
      <img
        src="path/to/profile-picture.jpg"
        alt="Profile Picture"
        className="profile-picture rounded-full h-16 w-16 border border-gray-300" // Ensure circular class is applied
      />
      <div className="profile-info flex flex-col items-center md:flex-row md:items-center gap-4 mt-4 md:mt-0">
        <div className="followers text-white">
          Followers: <span className="font-bold">123</span>
        </div>
        <div className="following text-white">
          Following: <span className="font-bold">456</span>
        </div>
        <button
          className="profile-button px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          onClick={openModal} // Open modal on click
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
