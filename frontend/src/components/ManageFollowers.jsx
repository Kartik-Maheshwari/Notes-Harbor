import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaBan, FaInfoCircle } from "react-icons/fa";
import Modal from "react-modal";

const ManageFollowers = () => {
  const [followings, setFollowings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFollowing, setSelectedFollowing] = useState(null);

  useEffect(() => {
    const fetchFollowings = async () => {
      try {
        // Step 1: Fetch the followings array containing user IDs
        const response = await axios.get(
          "http://localhost:3000/v1/follow/followings",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass the token for authentication
            },
          }
        );
        const followingIds = response.data;

        // Step 2: Fetch detailed information about the users
        const usersResponse = await axios.post(
          "http://localhost:3000/v1/follow/fetch-users",
          { userIds: followingIds }, // Pass the array of user IDs
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFollowings(usersResponse.data);
        console.log("Following data: ", usersResponse.data);
      } catch (error) {
        console.error("Failed to fetch followings", error);
      }
    };
    fetchFollowings();
  }, []);

  const handleRemove = async (followingId) => {
    try {
      await axios.put(
        `http://localhost:3000/v1/follow/${followingId}/unfollow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFollowings(
        followings.filter((following) => following._id !== followingId)
      );
    } catch (error) {
      console.error("Failed to unfollow user", error);
    }
  };

  const openModal = (following) => {
    setSelectedFollowing(following);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFollowing(null);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Manage Followings</h2>
      {followings.map((following) => (
        <div
          key={following._id}
          className="flex items-center justify-between bg-white p-3 mb-3 rounded-lg shadow-md"
        >
          <div className="flex items-center space-x-3">
            <img
              src={following.profilePicture || "default-picture-url.jpg"}
              alt={following.username}
              className="w-10 h-10 rounded-full"
            />
            <span>
              {following.firstname} {following.lastname} ({following.username})
            </span>
          </div>
          <div className="flex space-x-3 items-center">
            <FaInfoCircle
              className="text-blue-500 cursor-pointer hover:scale-110 transition-transform"
              onClick={() => openModal(following)}
            />
            <button
              onClick={() => handleRemove(following._id)}
              className="p-2 bg-red-500 text-white rounded hover:bg-red-700 transition-all duration-300"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
      {selectedFollowing && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Following Profile"
          className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20 animate-fadeIn"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <h2 className="text-2xl font-bold mb-4">
            {selectedFollowing.firstname} {selectedFollowing.lastname}
          </h2>
          <img
            src={selectedFollowing.profilePicture || "default-picture-url.jpg"}
            alt={selectedFollowing.username}
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <p>Email: {selectedFollowing.email}</p>
          <p>Username: {selectedFollowing.username}</p>
          <button
            onClick={closeModal}
            className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-300 w-full"
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default ManageFollowers;
