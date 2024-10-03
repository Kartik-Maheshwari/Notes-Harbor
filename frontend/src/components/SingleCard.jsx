import React, { useState, useEffect } from "react";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
  AiOutlineHome,
} from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleCard = () => {
  const { id: asset_id } = useParams();
  const [cardData, setCardData] = useState({});
  const [showMore, setShowMore] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const navigate = useNavigate();

  // Fetch card data by asset_id from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/v1/uploads/${asset_id}`
        );
        setCardData(response.data);
      } catch (error) {
        console.error("Failed to fetch card data", error);
      }
    };
    fetchData();
  }, [asset_id]);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const onBack = () => {
    navigate(-1);
  };

  const submitComment = () => {
    if (commentText.trim()) {
      setComments((prevComments) => [...prevComments, commentText]);
      setCommentText("");
      setShowCommentBox(false); // Hide comment box after submitting
    }
  };

  const toggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };

  // Share functionality
  const handleShareOptionClick = (action) => {
    // Call the corresponding share function based on the action
    switch (action) {
      case "copy":
        copyToClipboard();
        break;
      case "facebook":
        shareOnFacebook();
        break;
      case "twitter":
        shareOnTwitter();
        break;
      case "native":
        handleNativeShare();
        break;
      default:
        break;
    }

    // Close the share options
    setShowShareOptions(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success("Link copied to clipboard!");
    });
  };

  const shareOnFacebook = () => {
    const url = window.location.href;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(facebookShareUrl, "_blank");
  };

  const shareOnTwitter = () => {
    const url = window.location.href;
    const tweetText = "Check this out!";
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(tweetText)}`;
    window.open(twitterShareUrl, "_blank");
  };

  const handleNativeShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this content!",
          text: "Found this cool content and thought of sharing it with you.",
          url: url,
        })
        .then(() => console.log("Shared successfully!"))
        .catch((error) => console.error("Error sharing", error));
    } else {
      alert("Your browser doesn't support native sharing.");
    }
  };

  return (
    <div className="bg-aqua-100 min-h-screen flex items-start justify-center p-6 overflow-hidden">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden relative transition-transform duration-300 transform hover:scale-105 border-2 border-transparent">
        <div className="flex justify-between p-4 bg-aqua-200">
          <button
            onClick={onBack}
            className="text-gray-700 hover:bg-gray-200 border border-gray-300 rounded px-3 py-1 transition-colors duration-300 flex items-center"
          >
            <AiOutlineHome className="text-2xl animate-pulse" />
          </button>
          <h2 className="text-2xl font-bold text-center">{cardData.title}</h2>
        </div>

        <div className="relative">
          <img
            className="w-full h-64 object-cover cursor-pointer"
            src={cardData.previewImg}
            alt="Post"
            onClick={toggleCommentBox}
          />
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button type="button" onClick={toggleLike}>
                <AiOutlineHeart
                  className={`text-3xl transition-transform duration-300 ${
                    liked ? "text-red-500 animate-bounce" : "text-gray-500"
                  }`}
                />
              </button>
              <span className="text-lg font-semibold">
                {liked ? "1 Like" : "0 Likes"}
              </span>
            </div>
            <div className="text-sm text-gray-600 flex space-x-6">
              <p>
                Uploaded by: <span className="font-bold">{cardData.name}</span>
              </p>
              <p>Semester: {cardData.semester}</p>
            </div>
          </div>

          <p className="text-base text-gray-700">
            {showMore
              ? cardData.description
              : `${cardData.description?.substring(0, 150)}...`}
            {cardData.description?.length > 150 && (
              <button
                type="button"
                onClick={handleShowMore}
                className="text-blue-500 ml-2"
              >
                {showMore ? "Show Less" : "See More"}
              </button>
            )}
          </p>

          <div className="flex justify-start space-x-4 mt-4">
            <button
              type="button"
              className="flex items-center space-x-2"
              onClick={toggleCommentBox}
            >
              <AiOutlineComment className="text-3xl animate-pulse text-gray-500" />
              <span className="text-lg">Comments ({comments.length})</span>
            </button>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="flex items-center space-x-2"
                onClick={toggleShareOptions}
              >
                <AiOutlineShareAlt className="text-3xl animate-spin text-gray-500" />
                <span className="text-lg">Share</span>
              </button>

              {/* Conditionally render the share options when showShareOptions is true */}
              {showShareOptions && (
                <div className="flex flex-col space-y-2 mt-2">
                  <button
                    onClick={() => handleShareOptionClick("copy")}
                    className="text-blue-500"
                  >
                    Copy Link
                  </button>

                  <button
                    onClick={() => handleShareOptionClick("native")}
                    className="text-blue-500"
                  >
                    Native Share
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {showCommentBox && (
          <div className="p-6 border-t border-gray-200">
            <h3 className="font-bold text-lg">Comments:</h3>
            <div className="overflow-auto max-h-40 mb-4">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div
                    key={index}
                    className="mt-2 text-gray-700 transition-transform duration-300 transform translate-y-0 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {comment}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No comments yet.</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <textarea
                className="w-full border border-gray-300 rounded p-2"
                rows="2"
                placeholder="Write your comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
              <button className="text-blue-500" onClick={submitComment}>
                <IoMdSend className="text-2xl hover:text-blue-600 transition-transform duration-200 transform hover:scale-125" />
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
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
