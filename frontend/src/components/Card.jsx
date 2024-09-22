import React, { useState } from "react";
import { AiOutlineDownload, AiOutlineEye } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Card = ({ title, image, description, fileUrl }) => {
  const [clickCount, setClickCount] = useState(0);
  const downloadurl = fileUrl.replace("/upload/", "/upload/fl_attachment/");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleStarClick = () => {
    setClickCount(clickCount + 1);
  };

  const handleDownloadClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Prevent the default anchor tag action
      toast.error("Please login/signup to download the notes.");
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 w-64">
      <img
        className="w-full h-56 object-cover object-center"
        src={image || "https://via.placeholder.com/300x200"}
        alt="Card"
      />
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <div className="flex items-center">
            <FaStar
              className="text-yellow-500 cursor-pointer"
              onClick={handleStarClick}
            />
            <span className="text-gray-600 ml-1">{clickCount}</span>
          </div>
        </div>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <a
            href={downloadurl} // File URL to open in a new tab
            rel="noopener noreferrer" // Adds security by preventing the new tab from accessing the original page
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex items-center w-28"
            onClick={handleDownloadClick}
          >
            <AiOutlineDownload className="mr-2" />
            DownLoad
          </a>
          <Link to={`/singlecard/${note_id}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex items-center ml-3">
              <AiOutlineEye className="mr-2" />
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
