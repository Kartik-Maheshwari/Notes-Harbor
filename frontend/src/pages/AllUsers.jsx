import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleFollow = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:3000/v1/profile/follow/${userId}`);
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isFollowing: true } : user
          )
        );
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:3000/v1/profile/unfollow/${userId}`);
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isFollowing: false } : user
          )
        );
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const handleViewProfile = (userId) => {
    // Implement your view profile logic here
    console.log('Viewing profile for user:', userId);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/v1/profile/allusers');
        setUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-4">All Users</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner-border text-blue-500" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 * user._id }}
              className="bg-white rounded-lg p-4 shadow-md"
            >
              <div className="flex justify-center items-center mb-4">
                <img
                  src={user.profilePicture} // Assuming you have profile picture URLs
                  alt={user.username}
                  className="rounded-full w-24 h-24"
                  onError={(img) => {
                    img.src = 'https://via.placeholder.com/150'; // Set a default image if profile picture is missing
                  }}
                />
              </div>
              <h2 className="text-lg font-semibold">{user.username}</h2>
              <p className="text-gray-500 mb-2">
                {`${user.firstname} ${user.lastname}`}
              </p>
              <p className="text-gray-500 mb-4">{user.email}</p>
              {/* Implement follow, unfollow, and view profile logic here */}
              <div className="flex space-x-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() => handleFollow(user._id)} // Implement your follow logic
                >
                  Follow
                </button>
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                  onClick={() => handleUnfollow(user._id)} // Implement your unfollow logic
                >
                  Unfollow
                </button>
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                  onClick={() => handleViewProfile(user._id)} // Implement your view profile logic
                >
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllUsers;