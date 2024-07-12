import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUploads } from '../store/userSlice';

const ManageUploads = () => {
  const dispatch = useDispatch();
  const uploads = useSelector(state => state.user.uploads);

  useEffect(() => {
    dispatch(fetchUploads());
  }, [dispatch]);

  return (
    <div>
      <h2>Manage Uploads</h2>
      <ul>
        {uploads.map(upload => (
          <li key={upload.id}>{upload.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUploads;
