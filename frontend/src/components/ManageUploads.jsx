import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ManageUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [editingUpload, setEditingUpload] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    previewImg: "",
  });

  useEffect(() => {
    // Fetch the uploads of the logged-in user
    const fetchUploads = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "http://localhost:3000/v1/uploads/user/notes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);

        setUploads(response.data);
      } catch (error) {
        console.error("Failed to fetch uploads", error);
      }
    };
    fetchUploads();
  }, []);

  const handleEdit = (upload) => {
    setEditingUpload(upload.id);
    setFormData({
      title: upload.title,
      description: upload.description,
      previewImg: upload.previewImg,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:3000/v1/uploads/${editingUpload}`,
        formData
      );
      setUploads(
        uploads.map((upload) =>
          upload.id === editingUpload ? { ...upload, ...formData } : upload
        )
      );
      setEditingUpload(null);
    } catch (error) {
      console.error("Failed to update upload", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/v1/uploads/${upload.asset_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the deleted note from the state
      setUploads(uploads.filter((upload) => upload.asset_id !== id));
    } catch (error) {
      toast.error("Failed to delete upload", error);
    }
  }; 
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Manage Uploads</h2>
      {uploads.map((upload) => (
        <div
          key={upload.asset_id}
          className="flex items-center justify-between bg-white p-3 mb-3 rounded-lg shadow-md"
        >
          {/* Title and Timestamp */}
          <div className="w-2/3">
            <h3 className="text-xl font-bold">{upload.title}</h3>
            <p className="text-gray-500 text-sm">
              Uploaded: {new Date(upload.createdAt).toLocaleString()}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
          <button
  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
>
  <Link to={`/singlecard/${upload.asset_id}`} className="text-white">
    View
  </Link>
</button>
            <button
              onClick={() => handleDelete(upload.id)}
              className="p-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageUploads;
