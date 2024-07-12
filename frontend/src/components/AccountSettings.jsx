import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const AccountSettings = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');

  const handlePasswordChange = async () => {
    try {
      await axios.post('/api/change-password', { password });
      alert('Password changed successfully');
    } catch (error) {
      console.error('Error changing password', error);
      alert('Failed to change password');
    }
  };

  return (
    <div>
      <h2>Account Settings</h2>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handlePasswordChange}>Change Password</button>
    </div>
  );
};

export default AccountSettings;
