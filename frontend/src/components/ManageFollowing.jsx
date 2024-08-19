import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserMinus, FaInfoCircle } from 'react-icons/fa';

const ManageFollowings = () => {
  const [followings, setFollowings] = useState([
    { id: 1, name: 'John Doe', profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg', bio: 'Lorem ipsum dolor sit amet.' },
    { id: 2, name: 'Jane Smith', profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg', bio: 'Consectetur adipiscing elit.' },
    { id: 3, name: 'Alice Johnson', profilePicture: 'https://randomuser.me/api/portraits/women/3.jpg', bio: 'Vivamus luctus urna sed urna.' },
    { id: 4, name: 'Bob Brown', profilePicture: 'https://randomuser.me/api/portraits/men/4.jpg', bio: 'Vestibulum dapibus nunc ac augue.' },
    { id: 5, name: 'Charlie Green', profilePicture: 'https://randomuser.me/api/portraits/men/5.jpg', bio: 'Curabitur ligula sapien.' },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleInfoClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Manage Followings</h2>
      {followings.map((following) => (
        <div key={following.id} className="flex items-center justify-between bg-white p-3 mb-3 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <img src={following.profilePicture} alt={following.name} className="w-10 h-10 rounded-full" />
            <span>{following.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaInfoCircle
              className="text-blue-500 cursor-pointer transform transition-transform duration-300 hover:scale-125"
              onClick={() => handleInfoClick(following)}
            />
            <button onClick={() => handleUnfollow(following.id)} className="p-2 bg-red-500 text-white rounded hover:bg-red-700 transform transition-transform duration-300 hover:scale-110">
              <FaUserMinus />
            </button>
          </div>
        </div>
      ))}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 scale-100">
            <h2 className="text-xl font-semibold mb-4">{selectedUser.name}</h2>
            <p className="text-gray-600 mb-4">{selectedUser.bio}</p>
            <img src={selectedUser.profilePicture} alt={selectedUser.name} className="w-24 h-24 rounded-full mb-4" />
            <button onClick={closeModal} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFollowings;
