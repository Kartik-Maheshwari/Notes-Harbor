import React, { useState, useEffect } from 'react';
import { AiOutlineHeart, AiOutlineComment, AiOutlineShareAlt, AiOutlineArrowLeft } from 'react-icons/ai';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const SingleCard = () => {
  const { id } = useParams();
  const [cardData, setCardData] = useState({
    profilePic: 'https://via.placeholder.com/150',
    name: 'John Doe',
    image: 'https://via.placeholder.com/600x400',
    title: 'Sample Card Title',
    description: 'This is a sample description for the card. It provides a brief overview of the content that is displayed on this card.',
    semester: 'Fall 2023',
    uploader: 'Jane Smith',
  });
  const [showMore, setShowMore] = useState(false);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const navigate = useNavigate();

  // Uncomment this section when you want to fetch real data
  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/v1/uploads/${id}`
        );
        setCardData(response.data);
      } catch (error) {
        console.error("Failed to fetch card data", error);
      }
    };
    fetchData();
  }, [id]);
  */

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  const onBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const submitComment = () => {
    if (commentText.trim()) {
      setComments([...comments, commentText]);
      setCommentText('');
      setShowCommentDialog(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:border-blue-500 border-2 border-transparent">
      <div className="px-4 py-3 space-y-3">
        <button onClick={onBack} className="text-gray-700 hover:bg-gray-200 border border-gray-300 rounded px-3 py-1 transition-colors duration-300 flex items-center">
          <AiOutlineArrowLeft />
        </button>
        <h2 className="text-lg font-bold text-center">{cardData.title}</h2>
        <img className="w-full h-32 object-cover rounded-lg" src={cardData.image} alt="Post" />
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2 text-gray-500">
            <button type="button" onClick={toggleLike}>
              <AiOutlineHeart className={`text-xl ${liked ? 'text-red-500' : 'text-gray-500'}`} />
            </button>
            <button type="button" onClick={() => setShowCommentDialog(true)}>
              <AiOutlineComment className="text-xl" />
            </button>
            <button type="button">
              <AiOutlineShareAlt className="text-xl" />
            </button>
          </div>
          <div className="text-sm text-gray-600">
            <p>Semester: {cardData.semester}</p>
            <p>Uploaded by: {cardData.uploader}</p>
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
