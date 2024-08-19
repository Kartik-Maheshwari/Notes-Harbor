import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaBan } from 'react-icons/fa';

const ManageFollowers = () => {
  const [followers, setFollowers] = useState([
    { id: 1, name: 'John Doe', profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Jane Smith', profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, name: 'Alice Johnson', profilePicture: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { id: 4, name: 'Bob Brown', profilePicture: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { id: 5, name: 'Charlie Green', profilePicture: 'https://randomuser.me/api/portraits/men/5.jpg' },
  ]);

  useEffect(() => {
    // Uncomment this section when you have a working API to fetch followers
    // const fetchFollowers = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:3000/v1/followers');
    //     setFollowers(response.data);
    //   } catch (error) {
    //     console.error('Failed to fetch followers', error);
    //   }
    // };
    // fetchFollowers();
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

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Manage Followers</h2>
      {followers.map((follower) => (
        <div key={follower.id} className="flex items-center justify-between bg-white p-3 mb-3 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <img src={follower.profilePicture} alt={follower.name} className="w-10 h-10 rounded-full" />
            <span>{follower.name}</span>
          </div>
          <div className="flex space-x-3">
            <button onClick={() => handleRemove(follower.id)} className="p-2 bg-red-500 text-white rounded hover:bg-red-700">
              <FaTrash />
            </button>
            <button onClick={() => handleBlock(follower.id)} className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-700">
              <FaBan />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageFollowers;
