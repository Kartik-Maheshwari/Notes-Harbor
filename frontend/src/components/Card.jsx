import React, { useState } from "react";
import {
  AiOutlineDownload,
  AiOutlineMore,
  AiOutlineHeart,
} from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IoMdShare } from "react-icons/io";

const Card = ({ title, image, description, fileUrl, note_id, name }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
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

  const submitComment = () => {
    if (commentText.trim()) {
      setComments([...comments, commentText]);
      setCommentText("");
      setShowCommentDialog(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 w-64 m-4">
      {/* Main wrapper */}
      <div className="flex flex-col">
        {/* First div: Preview Image */}
        <div
          className="w-full h-56 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              image || "https://via.placeholder.com/300x200"
            })`,
          }}
        ></div>

        {/* Second div: Title and Uploader Name */}
        <div className="p-4">
          <div className="text-gray-800 font-semibold">{title}</div>
          <sub className="text-xs text-gray-500">uploaded by {name}</sub>
        </div>

        {/* Third div: Buttons (Download & View) */}
        <div className="flex justify-between items-center p-4">
          <a
            href={downloadurl}
            onClick={handleDownloadClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            download
          >
            Download
          </a>
          <Link
            to={`/singlecard/${note_id}`}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
          >
            View
          </Link>
        </div>
      </div>

     
      
    </div>
  );
};

export default Card;
