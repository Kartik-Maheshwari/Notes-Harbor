import React, { useState } from 'react';
import { AiOutlineHeart, AiOutlineComment, AiOutlineShareAlt } from 'react-icons/ai';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const SingleCard = () => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const sampleProfilePic = 'https://placeimg.com/64/64/people'; // Placeholder image
  const sampleName = 'Jane Smith';
  const sampleImage = 'https://placeimg.com/640/480/arch'; // Placeholder image
  const sampleTitle = 'A Beautiful Landscape';
  const sampleDescription =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin pulvinar leo augue, ac egestas erat condimentum sed. Donec sed odio dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas pharetra convallis magna.';

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg" // Combined hover effects
    >
      <div className="px-4 py-3 space-y-3"> {/* Added space-y-3 for vertical spacing */}
      <Link to="/" className="text-white bg-transparent hover:bg-white hover:text-gray-800 border border-white hover:border-transparent rounded px-3 py-1 transition-colors duration-300 flex items-center" ><button type="button" className=' bg-black'  >
      <AiOutlineArrowLeft />
    </button> </Link>
        <div className="flex items-center border-b border-gray-200 pb-3"> {/* Added border */}
          <img
            className="w-10 h-10 rounded-full mr-3 object-cover"
            src={sampleProfilePic}
            alt="Profile picture"
          />
          <div className="flex-grow">
            <p className="text-base font-medium">{sampleName}</p>
            <div className="flex items-center space-x-2 text-gray-500 justify-end"> {/* Added justify-end for right alignment */}
              <button type="button">
                <AiOutlineHeart />
              </button>
              <button type="button">
                <AiOutlineComment />
              </button>
              <button type="button">
                <AiOutlineShareAlt />
              </button>
            </div>
          </div>
        </div>
        <img className="w-full h-48 object-cover rounded-lg" src={sampleImage} alt="Post image" /> {/* Added rounded-lg for image border radius */}
        <div className="px-4 py-3">
          <p className="text-lg font-bold">{sampleTitle}</p>
          <p className="text-base text-gray-700">
            {showMore ? sampleDescription : `${sampleDescription.substring(0, 100)}...`}
            {sampleDescription.length > 100 && (
              <button type="button" onClick={handleShowMore}>
                {showMore ? 'Show Less' : 'See More'}
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
