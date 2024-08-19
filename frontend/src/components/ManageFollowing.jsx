import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserMinus, FaInfoCircle } from "react-icons/fa";

const ManageFollowings = () => {
  const [followings, setFollowings] = useState([
    { id: 1, name: 'John Doe', profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg', bio: 'Software Engineer at XYZ' },
    { id: 2, name: 'Jane Smith', profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg', bio: 'Product Manager at ABC' },
    { id: 3, name: 'Alice Johnson', profilePicture: 'https://randomuser.me/api/portraits/women/3.jpg', bio: 'Designer at DEF' },
    { id: 4, name: 'Bob Brown', profilePicture: 'https://randomuser.me/api/portraits/men/4.jpg', bio: 'Data Analyst at GHI' },
    { id: 5, name: 'Charlie Green', profilePicture: 'https://randomuser.me/api/portraits/men/5.jpg', bio: 'Developer at JKL' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Uncomment this section when you have a working API to fetch followings
    // const fetchFollowings = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:3000/v1/followings');
    //     setFollowings(response.data);
    //   } catch (error) {
    //     console.error('Failed to fetch followings', error);
    //   }
    // };
    // fetchFollowings();
  }, []);

  const handleUnfollow = async (followingId) => {
    try {
      await axios.delete(`http://localhost:3000/v1/followings/${followingId}`);
      setFollowings(followings.filter(following => following.id !== followingId));
    } catch (error) {
      console.error('Failed to unfollow user', error);
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Manage Followings</h2>
      {followings.map((following) => (
        <div key={following.id} className="flex items-center justify-between bg-white p-3 mb-3 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <img src={following.profilePicture} alt={following.name} className="w-10 h-10 rounded-full cursor-pointer" onClick={() => openModal(following)} />
            <span>{following.name}</span>
            <FaInfoCircle className="text-blue-500 cursor-pointer" onClick={() => openModal(following)} />
          </div>
          <button onClick={() => handleUnfollow(following.id)} className="p-2 bg-red-500 text-white rounded hover:bg-red-700">
            <FaUserMinus />
          </button>
        </div>
      ))}

      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-2xl font-bold mb-4">{selectedUser.name}</h3>
            <img src={selectedUser.profilePicture} alt={selectedUser.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
            <p className="text-gray-700">{selectedUser.bio}</p>
            <button onClick={closeModal} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFollowings;
