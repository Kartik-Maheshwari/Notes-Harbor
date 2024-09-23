import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaFilter } from "react-icons/fa6";
import Card from "../components/Card.jsx";
import Cards from "../components/Cards.jsx";
import UploadBox from "../components/Upload.jsx";
import Modal from "../components/Modal.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const MainPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploads, setUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchUploads = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/v1/uploads/all");
        setUploads(response.data);
      } catch (error) {
        console.error("Error fetching uploads:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUploads();
  }, []);

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Pagination logic
  const indexOfLastUpload = currentPage * itemsPerPage;
  const indexOfFirstUpload = indexOfLastUpload - itemsPerPage;
  const currentUploads = uploads.slice(indexOfFirstUpload, indexOfLastUpload);
  const totalPages = Math.ceil(uploads.length / itemsPerPage);

  return (
    <div className="flex flex-col gap-4 mt-2">
      <ToastContainer position="top-left" autoClose={5000} hideProgressBar={false} />

      {/* Profile Section */}
      {isLoggedIn && (
        <div className="profile-section flex flex-col md:flex-row md:justify-between md:items-center bg-slate-600 p-3 rounded-lg">
          <div className="flex items-center gap-3">
            <img
              src="path/to/profile-picture.jpg"
              alt="Profile Picture"
              className="profile-picture rounded-full h-12 w-12 border border-gray-300"
            />
            <div className="text-white text-xl">
              Welcome <span className="font-bold">User</span>
            </div>
          </div>

          <div className="profile-info flex flex-col md:flex-row md:items-center gap-3 mt-2 md:mt-0">
            <div className="followers text-white">Followers: <span className="font-bold">0</span></div>
            <div className="following text-white">Following: <span className="font-bold">0</span></div>
            <div className="total-notes text-white">Total Notes Uploaded: <span className="font-bold">0</span></div>
            <button className="profile-button px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300" onClick={openModal}>
              Upload
            </button>
          </div>

          <div className="filter-container flex items-center gap-2 mt-2 md:mt-0">
            <select
              value={selectedFilter}
              onChange={handleFilterChange}
              className="filter-select px-2 py-1 rounded-md text-gray-700 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="most-rated">Most Rated</option>
              <option value="latest">Latest</option>
            </select>
            <button className="filter-button flex items-center space-x-1 px-2 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-700" onClick={openModal}>
              <FaFilter className="filter-icon h-4 w-4" />
              Filters
            </button>
          </div>
        </div>
      )}

      {/* Cards Section without Scroll Bar */}
      <div className="flex flex-col max-w-[85%] mx-auto gap-3 h-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">Loading...</div>
        ) : (
          <Cards uploads={currentUploads} />
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className={`px-4 py-2 rounded-md ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UploadBox />
      </Modal>
    </div>
  );
};

export default MainPage;
