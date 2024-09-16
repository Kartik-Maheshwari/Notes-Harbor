import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUserPlus, FaUserMinus, FaInfoCircle } from 'react-icons/fa';

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null); // State to hold error messages

  const handleFollow = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:3000/v1/profile/follow/${userId}`);
      if (response.status === 200) {
        setUsers(prevUsers =>
          prevUsers.map(user =>
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
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user._id === userId ? { ...user, isFollowing: false } : user
          )
        );
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/v1/profile/allusers');
        setUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users. Please try again later.'); // Set error message
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `${user.firstname} ${user.lastname}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-4">All Users</h1>
      
      {/* Error Message Display */}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner-border text-blue-500" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 * user._id }}
              className="bg-white rounded-lg p-4 shadow-md"
            >
              <div className="flex justify-center items-center mb-4">
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  className="rounded-full w-24 h-24"
                  onError={(img) => {
                    img.src = 'https://via.placeholder.com/150';
                  }}
                />
              </div>
              <h2 className="text-lg font-semibold">{user.username}</h2>
              <p className="text-gray-500 mb-2">{`${user.firstname || ''} ${user.lastname || ''}`}</p>
              <p className="text-gray-500 mb-4">{user.email}</p>
              <div className="flex space-x-2">
                {user.isFollowing ? (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleUnfollow(user._id)}
                  >
                    <FaUserMinus /> Unfollow
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleFollow(user._id)}
                  >
                    <FaUserPlus /> Follow
                  </button>
                )}
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                  onClick={() => handleViewProfile(user)}
                >
                  <FaInfoCircle /> View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 scale-100">
            <h2 className="text-xl font-semibold mb-4">{selectedUser.username}</h2>
            <p className="text-gray-600 mb-4">{`${selectedUser.firstname || ''} ${selectedUser.lastname || ''}`}</p>
            <p className="text-gray-600 mb-4">{selectedUser.email}</p>
            <img src={selectedUser.profilePicture} alt={selectedUser.username} className="w-24 h-24 rounded-full mb-4" />
            <button onClick={closeModal} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllUsers;
