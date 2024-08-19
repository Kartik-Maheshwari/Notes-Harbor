import React, { useState, useEffect } from 'react';
import { AiOutlineHeart, AiOutlineComment, AiOutlineShareAlt, AiOutlineArrowLeft } from 'react-icons/ai';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const SingleCard = () => {
  const { id } = useParams();
  const [cardData, setCardData] = useState({});
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/cards/${id}`);
        setCardData(response.data);
      } catch (error) {
        console.error('Failed to fetch card data', error);
      }
    };
    fetchData();
  }, [id]);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const onBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:border-blue-500 border-2 border-transparent">
      <div className="px-4 py-3 space-y-3">
        <button onClick={onBack} className="text-gray-700 hover:bg-gray-200 border border-gray-300 rounded px-3 py-1 transition-colors duration-300 flex items-center">
          <AiOutlineArrowLeft />
        </button>
        <div className="flex items-center border-b border-gray-200 pb-3">
          <img
            className="w-10 h-10 rounded-full mr-3 object-cover"
            src={cardData.profilePic}
            alt="Profile picture"
          />
          <div className="flex-grow">
            <p className="text-base font-medium">{cardData.name}</p>
            <div className="flex items-center space-x-2 text-gray-500 justify-end">
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
        <img className="w-full h-48 object-cover rounded-lg" src={cardData.image} alt="Post image" />
        <div className="px-4 py-3">
          <p className="text-lg font-bold">{cardData.title}</p>
          <p className="text-base text-gray-700">
            {showMore ? cardData.description : `${cardData.description?.substring(0, 100)}...`}
            {cardData.description?.length > 100 && (
              <button type="button" onClick={handleShowMore} className="text-blue-500 ml-2">
                {showMore ? 'Show Less' : 'See More'}
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

SingleCard.propTypes = {
  profilePic: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default SingleCard;
