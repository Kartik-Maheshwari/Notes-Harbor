import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserMinus } from 'react-icons/fa';

const ManageFollowings = () => {
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    // Fetch the followings of the logged-in user
    const fetchFollowings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/v1/followings');
        setFollowings(response.data);
      } catch (error) {
        console.error('Failed to fetch followings', error);
      }
    };
    fetchFollowings();
  }, []);

  const handleUnfollow = async (followingId) => {
    try {
      await axios.delete(`http://localhost:3000/v1/followings/${followingId}`);
      setFollowings(followings.filter(following => following.id !== followingId));
    } catch (error) {
      console.error('Failed to unfollow user', error);
    }
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
          <button onClick={() => handleUnfollow(following.id)} className="p-2 bg-red-500 text-white rounded hover:bg-red-700">
            <FaUserMinus />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageFollowings;
