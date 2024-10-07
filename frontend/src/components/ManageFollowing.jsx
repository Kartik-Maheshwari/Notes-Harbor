import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserMinus, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ManageFollowings = () => {
  const [followers, setFollowers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/v1/follow/followers",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const followerIds = response.data;

        const usersResponse = await axios.post(
          "http://localhost:3000/v1/follow/fetch-users",
          { userIds: followerIds },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFollowers(usersResponse.data);
      } catch (error) {
        console.error("Failed to fetch followers", error);
      }
    };
    fetchFollowers();
  }, []);

  const handleUnfollow = async (followerId) => {
    try {
      await axios.delete(`http://localhost:3000/v1/follow/${followerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFollowers(followers.filter((follower) => follower._id !== followerId));
    } catch (error) {
      console.error("Failed to unfollow user", error);
    }
  };

  const handleInfoClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const viewProfile = () => {
    navigate(`/profilepage/${selectedUser._id}`); // Navigate to the profile page with the user's ID
    setIsModalOpen(false); // Close the modal after navigating
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Manage Followers</h2>
      {followers.map((follower) => (
        <div
          key={follower._id}
          className="flex items-center justify-between bg-white p-3 mb-3 rounded-lg shadow-md"
        >
          <div className="flex items-center space-x-3">
            <img
              src={follower.profilePicture || "default-picture-url.jpg"}
              alt={follower.username}
              className="w-10 h-10 rounded-full"
            />
            <span>
              {follower.firstname} {follower.lastname} ({follower.username})
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaInfoCircle
              className="text-blue-500 cursor-pointer transform transition-transform duration-300 hover:scale-125"
              onClick={() => handleInfoClick(follower)}
            />
            <button
              onClick={() => handleUnfollow(follower._id)}
              className="p-2 bg-red-500 text-white rounded hover:bg-red-700 transform transition-transform duration-300 hover:scale-110"
            >
              <FaUserMinus />
            </button>
          </div>
        </div>
      ))}

      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 scale-100">
            <h2 className="text-xl font-semibold mb-4">
              {selectedUser.firstname} {selectedUser.lastname} (
              {selectedUser.username})
            </h2>
            <p className="text-gray-600 mb-4">{selectedUser.bio}</p>
            <img
              src={selectedUser.profilePicture || "default-picture-url.jpg"}
              alt={selectedUser.username}
              className="w-24 h-24 rounded-full mb-4"
            />
            <div className="flex space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out"
              >
                Close
              </button>
              <button
                onClick={viewProfile}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFollowings;
