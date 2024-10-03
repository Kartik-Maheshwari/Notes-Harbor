import React, { useState } from "react";
import {
  AiOutlineDownload,
  AiOutlineEye,
  AiOutlineComment,
  AiOutlineMore,
  AiOutlineHeart,
} from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IoMdShare } from "react-icons/io";

const Card = ({ title, image, description, fileUrl, note_id, name }) => {
  const [isLiked, setIsLiked] = useState(false); // Track like state
  const [showDropdown, setShowDropdown] = useState(false); // Track dropdown state
  const [showCommentDialog, setShowCommentDialog] = useState(false); // Track comment dialog state
  const [comments, setComments] = useState([]); // Store comments
  const [commentText, setCommentText] = useState(""); // Hold comment text
  const downloadurl = fileUrl.replace("/upload/", "/upload/fl_attachment/");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handleDownloadClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      toast.error("Please login/signup to download the notes.");
    }
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const submitComment = () => {
    if (commentText.trim()) {
      setComments([...comments, commentText]);
      setCommentText("");
      setShowCommentDialog(false); // Assuming this should be closed after submission
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 w-64 m-4">
      <div className="relative flex justify-between items-center p-2">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div>
          <div className="text-gray-800 font-semibold">{title}</div>
          <sub className="text-xs text-gray-500 ml-1">uploaded by {name}</sub>
        </div>
        <button
          className="focus:outline-none hover:bg-gray-300 rounded-full text-3xl"
          onClick={handleDropdownClick}
        >
          <AiOutlineMore />
        </button>
        {showDropdown && (
          <ul className="absolute top-full right-0 bg-white rounded-lg shadow-md py-2">
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link
                to={`/singlecard/${note_id}`}
                className="block w-full text-left"
              >
                Detailed View
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">Preview</li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <button onClick={handleDownloadClick}>Download</button>
            </li>
          </ul>
        )}
      </div>
      <div
        className="w-full h-56 object-cover object-center"
        style={{
          backgroundImage: `url(${
            image || "https://via.placeholder.com/300x200"
          })`,
        }}
      >
        {/* Image displayed using background-image for better responsiveness */}
      </div>
      <div className="p-6">
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
      <div className="flex justify-between items-center p-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <button onClick={handleLikeClick} className="text-gray-600">
            <AiOutlineHeart
              className={`text-xl ${isLiked ? "text-red-500" : ""}`}
            />
          </button>
          <button
            onClick={() => setShowCommentDialog(true)}
            className="text-gray-600"
          >
            <AiOutlineComment className="text-xl" />
          </button>
          <button className="text-gray-600">
            <IoMdShare className="text-xl" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold">Comments:</h3>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="mt-2 text-gray-700">
              {comment}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
      {showCommentDialog && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add a Comment</h2>
            <textarea
              className="w-full border border-gray-300 rounded p-2"
              rows="4"
              placeholder="Write your comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={submitComment}
              >
                Submit
              </button>
              <button
                className="ml-2 text-gray-500"
                onClick={() => setShowCommentDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
