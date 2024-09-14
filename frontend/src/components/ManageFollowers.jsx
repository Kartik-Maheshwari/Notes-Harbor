import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaBan, FaInfoCircle } from 'react-icons/fa';
import Modal from 'react-modal';

const ManageFollowers = () => {
  const [followers, setFollowers] = useState([
   
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFollower, setSelectedFollower] = useState(null);

  useEffect(() => {
    // Uncomment when you have a working API to fetch followers
    const fetchFollowers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/followers');
        setFollowers(response.data);
      } catch (error) {
        console.error('Failed to fetch followers', error);
      }
    };
    fetchFollowers();
  }, []);

  const handleRemove = async (followerId) => {
    try {
      await axios.delete(`http://localhost:3000/v1/followers/${followerId}`);
      setFollowers(followers.filter(follower => follower.id !== followerId));
    } catch (error) {
      console.error('Failed to remove follower', error);
    }
  };

  const handleBlock = async (followerId) => {
    try {
      await axios.post(`http://localhost:3000/v1/block/${followerId}`);
      setFollowers(followers.filter(follower => follower.id !== followerId));
    } catch (error) {
      console.error('Failed to block follower', error);
    }
  };

  const openModal = (follower) => {
    setSelectedFollower(follower);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFollower(null);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Manage Followers</h2>
      {followers.map((follower) => (
        <div key={follower.id} className="flex items-center justify-between bg-white p-3 mb-3 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <img src={follower.profilePicture} alt={follower.name} className="w-10 h-10 rounded-full" />
            <span>{follower.name}</span>
          </div>
          <div className="flex space-x-3 items-center">
            <FaInfoCircle
              className="text-blue-500 cursor-pointer hover:scale-110 transition-transform"
              onClick={() => openModal(follower)}
            />
            <button onClick={() => handleRemove(follower.id)} className="p-2 bg-red-500 text-white rounded hover:bg-red-700 transition-all duration-300">
              <FaTrash />
            </button>
            <button onClick={() => handleBlock(follower.id)} className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition-all duration-300">
              <FaBan />
            </button>
          </div>
        </div>
      ))}
      {selectedFollower && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Follower Profile"
          className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20 animate-fadeIn"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <h2 className="text-2xl font-bold mb-4">{selectedFollower.name}</h2>
          <img
            src={selectedFollower.profilePicture}
            alt={selectedFollower.name}
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <p>Additional details about {selectedFollower.name} can go here.</p>
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
