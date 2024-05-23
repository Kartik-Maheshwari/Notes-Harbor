import React, { useState } from "react";
import { AiOutlineDownload, AiOutlineEye } from 'react-icons/ai';
import { FaStar } from 'react-icons/fa';

const Card = () => {
  const [clickCount, setClickCount] = useState(0);

  const handleStarClick = () => {
    setClickCount(clickCount + 1);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 w-64">
      <img className="w-full h-56 object-cover object-center" src="https://via.placeholder.com/300x200" alt="Card" />
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Card Title</h2>
          <div className="flex items-center">
            <FaStar className="text-yellow-500 cursor-pointer" onClick={handleStarClick} />
            <span className="text-gray-600 ml-1">{clickCount}</span>
          </div>
        </div>
        <p className="mt-2 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel libero vel turpis suscipit dictum.</p>
        <div className="mt-4 flex justify-between items-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex items-center w-full">
            <AiOutlineDownload className="mr-2" />
            Download Now
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex items-center ml-3 h-16 w-36">
            <AiOutlineEye className="mr-2" />
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
