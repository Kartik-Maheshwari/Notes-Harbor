import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaFilter } from "react-icons/fa";
import Cards from "../components/Cards.jsx";
import UploadBox from "../components/Upload.jsx";
import Modal from "../components/Modal.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Range } from "react-range"; // for the rating slider

const MainPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSortOrder, setSelectedSortOrder] = useState("most-recent");
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMiscellaneous, setIsMiscellaneous] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const uploadsPerPage = 10;

  const subjectsBySemester = {
    1: ["Math 101", "Physics 101", "Chemistry 101", "CS 101"],
    2: ["Math 102", "Physics 102", "Chemistry 102", "CS 102"],
    // Add other subjects...
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const profileResponse = await axios.get("http://localhost:3000/v1/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(profileResponse.data);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };
    if (isLoggedIn) {
      fetchProfileData();
    }
  }, [isLoggedIn]);

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
  }, [isModalOpen]);

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
    setSelectedSubject("");
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSelectedSortOrder(event.target.value);
  };

  const handleRatingChange = (values) => {
    setRatingRange(values);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filtering logic
  const getFilteredUploads = () => {
    let filteredUploads = [...uploads];

    // Filter by Semester
    if (selectedSemester) {
      filteredUploads = filteredUploads.filter((upload) => upload.semester === selectedSemester);
    }

    // Filter by Subject
    if (selectedSubject) {
      filteredUploads = filteredUploads.filter((upload) => upload.subject === selectedSubject);
    }

    // Filter by Rating Range
    filteredUploads = filteredUploads.filter(
      (upload) => upload.rating >= ratingRange[0] && upload.rating <= ratingRange[1]
    );

    // Filter by Miscellaneous
    if (isMiscellaneous) {
      filteredUploads = filteredUploads.filter((upload) => upload.category === "Miscellaneous");
    }

    // Sort based on Sort Order (most-recent, least-recent, rating-high-low, rating-low-high)
    if (selectedSortOrder === "most-recent") {
      filteredUploads = filteredUploads.sort(
        (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
      );
    } else if (selectedSortOrder === "least-recent") {
      filteredUploads = filteredUploads.sort(
        (a, b) => new Date(a.uploadDate) - new Date(b.uploadDate)
      );
    } else if (selectedSortOrder === "rating-high-low") {
      filteredUploads = filteredUploads.sort((a, b) => b.rating - a.rating);
    } else if (selectedSortOrder === "rating-low-high") {
      filteredUploads = filteredUploads.sort((a, b) => a.rating - b.rating);
    }

    // Pagination logic
    const indexOfLastUpload = currentPage * uploadsPerPage;
    const indexOfFirstUpload = indexOfLastUpload - uploadsPerPage;
    return filteredUploads.slice(indexOfFirstUpload, indexOfLastUpload);
  };

  const filteredUploads = getFilteredUploads();
  const totalPages = Math.ceil(uploads.length / uploadsPerPage);

  return (
    <div className="flex flex-col gap-4 mt-2 px-4 h-screen">
  {/* Profile Section */}
  {isLoggedIn && profileData && (
    <div className="w-full bg-slate-600 p-6 rounded-lg mb-4 flex-shrink-0">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <img
          src={profileData.profilePicture || "path/to/profile-picture.jpg"}
          alt="Profile"
          className="rounded-full h-16 w-16 border border-gray-300"
        />
        <div className="text-white text-2xl">
          Welcome <span className="font-bold">{profileData.firstname}</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="text-white">
            Followers: <span className="font-bold">{profileData.followers.length}</span>
          </div>
          <div className="text-white">
            Following: <span className="font-bold">{profileData.followings.length}</span>
          </div>
          <div className="text-white">
            Total Notes Uploaded: <span className="font-bold">{profileData.notes.length}</span>
          </div>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            onClick={openModal}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  )}

  <div className="flex h-full gap-4">
    {/* Sidebar Filter */}
    <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md flex-shrink-0 overflow-auto">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Filter by Semester */}
      <div className="mb-4">
        <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
          Semester
        </label>
        <select
          id="semester"
          value={selectedSemester}
          onChange={handleSemesterChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Semesters</option>
          {[...Array(8).keys()].map((sem) => (
            <option key={sem + 1} value={sem + 1}>
              Semester {sem + 1}
            </option>
          ))}
        </select>
      </div>

      {/* More filters */}
      {/* Add rest of your filters here like you already have */}
    </div>

    {/* Scrollable Cards Section */}
    <div className="w-3/4 overflow-y-scroll h-full">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner w-11 h-11 relative">
            <div className="absolute w-full h-full bg-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <>
          <Cards uploads={filteredUploads} />

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 ${
                currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  </div>
</div>

  );
};

export default MainPage;

