import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaSave } from 'react-icons/fa';

const ManageUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [editingUpload, setEditingUpload] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', previewImg: '' });

  useEffect(() => {
    // Fetch the uploads of the logged-in user
    const fetchUploads = async () => {
      try {
        const response = await axios.get('http://localhost:3000/v1/uploads');
        setUploads(response.data);
      } catch (error) {
        console.error('Failed to fetch uploads', error);
      }
    };
    fetchUploads();
  }, []);

  const handleEdit = (upload) => {
    setEditingUpload(upload.id);
    setFormData({ title: upload.title, description: upload.description, previewImg: upload.previewImg });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/v1/uploads/${editingUpload}`, formData);
      setUploads(uploads.map(upload => (upload.id === editingUpload ? { ...upload, ...formData } : upload)));
      setEditingUpload(null);
    } catch (error) {
      console.error('Failed to update upload', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Manage Uploads</h2>
      {uploads.map((upload) => (
        <div key={upload.id} className="flex items-center justify-between bg-white p-3 mb-3 rounded-lg shadow-md">
          {editingUpload === upload.id ? (
            <>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-1/3 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-1/3 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="previewImg"
                value={formData.previewImg}
                onChange={handleChange}
                className="w-1/3 p-2 border border-gray-300 rounded"
              />
              <button onClick={handleSave} className="ml-3 p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                <FaSave />
              </button>
            </>
          ) : (
            <>
              <div className="w-1/3">
                <img src={upload.previewImg} alt={upload.title} className="w-full h-20 object-cover rounded" />
              </div>
              <div className="w-1/3">
                <h3 className="text-xl font-bold">{upload.title}</h3>
                <p>{upload.description}</p>
              </div>
              <button onClick={() => handleEdit(upload)} className="ml-3 p-2 bg-green-500 text-white rounded hover:bg-green-700">
                <FaEdit />
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManageUploads;
