import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaFilter } from "react-icons/fa6";
import Card from "../components/Card.jsx";
import Cards from "../components/Cards.jsx";
import SingleCard from "../components/SingleCard.jsx";
import UploadBox from "../components/Upload.jsx";
import Modal from "../components/Modal.jsx";
import axios from "axios";
import { login, logout } from "../store/authSlice.js";
import { jwtDecode } from "jwt-decode";

const MainPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [uploads, setUploads] = useState([]);

  const subjectsBySemester = {
    1: [
      "Math 101",
      "Physics 101",
      "Chemistry 101",
      "Biology 101",
      "CS 101",
      "English 101",
    ],
    2: [
      "Math 102",
      "Physics 102",
      "Chemistry 102",
      "Biology 102",
      "CS 102",
      "English 102",
    ],
    3: [
      "Math 201",
      "Physics 201",
      "Chemistry 201",
      "Biology 201",
      "CS 201",
      "English 201",
    ],
    4: [
      "Math 202",
      "Physics 202",
      "Chemistry 202",
      "Biology 202",
      "CS 202",
      "English 202",
    ],
    5: [
      "Math 301",
      "Physics 301",
      "Chemistry 301",
      "Biology 301",
      "CS 301",
      "English 301",
    ],
    6: [
      "Math 302",
      "Physics 302",
      "Chemistry 302",
      "Biology 302",
      "CS 302",
      "English 302",
    ],
    7: [
      "Math 401",
      "Physics 401",
      "Chemistry 401",
      "Biology 401",
      "CS 401",
      "English 401",
    ],
    8: [
      "Math 402",
      "Physics 402",
      "Chemistry 402",
      "Biology 402",
      "CS 402",
      "English 402",
    ],
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const profileResponse = await axios.get(
          "http://localhost:3000/v1/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfileData(profileResponse.data);
        console.log(profileResponse.data);
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
      try {
        const response = await axios.get(
          "http://localhost:3000/v1/uploads/all"
        ); // Your API endpoint
        console.log(response.data);

        setUploads(response.data);
      } catch (error) {
        console.error("Error fetching uploads:", error);
      }
    };

    fetchUploads();
  }, []);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex flex-col gap-4 mt-2">
      {isLoggedIn && profileData && (
        <div className="profile-section flex flex-col justify-center items-center md:flex-row md:justify-between md:items-center bg-slate-600 p-3 py-5 rounded-lg">
          <img
            src={profileData.profilePicture || "path/to/profile-picture.jpg"}
            alt="Profile Picture"
            className="profile-picture rounded-full h-16 w-16 border border-gray-300"
          />
          <div className="following text-white text-2xl">
            Welcome <span className="font-bold">{profileData.firstname}</span>
          </div>
          <div className="profile-info flex flex-col items-center md:flex-row md:items-center gap-4 mt-4 md:mt-0">
            <div className="followers text-white">
              Followers:{" "}
              <span className="font-bold">{profileData.followers.length}</span>
            </div>
            <div className="following text-white">
              Following:{" "}
              <span className="font-bold">{profileData.followings.length}</span>
            </div>
            <div className="following text-white">
              Total Notes Uploaded:{" "}
              <span className="font-bold">{profileData.notes.length}</span>
            </div>
            <button
              className="profile-button px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              onClick={openModal}
            >
              Upload
            </button>
          </div>
        </div>
      )}

      <div className="filter-container flex flex-col justify-center items-center md:flex-row md:justify-end md:items-center space-x-2">
        <div className="filter-dropdown flex items-center space-x-2">
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            className="filter-select px-3 py-2 rounded-md text-gray-700 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="most-rated">Most Rated</option>
            <option value="latest">Latest</option>
          </select>
          <select
            value={selectedSemester}
            onChange={handleSemesterChange}
            className="semester-select px-3 py-2 rounded-md text-gray-700 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select Semester</option>
            {[...Array(8).keys()].map((semester) => (
              <option key={semester + 1} value={semester + 1}>
                Semester {semester + 1}
              </option>
            ))}
          </select>
          <select
            value={selectedSubject}
            onChange={handleSubjectChange}
            className="subject-select px-3 py-2 rounded-md text-gray-700 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={!selectedSemester}
          >
            <option value="">Select Subject</option>
            {selectedSemester &&
              subjectsBySemester[selectedSemester].map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
          </select>
          <button className="filter-button flex items-center space-x-1 px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700">
            <FaFilter className="filter-icon h-4 w-4" />
            Filters
          </button>
        </div>
      </div>

      <div className="max-w-[85%] mx-auto gap-3">
        <Cards
          selectedFilter={selectedFilter}
          selectedSemester={selectedSemester}
          selectedSubject={selectedSubject}
          uploads={uploads}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UploadBox />
        {/* <Sample /> */}
      </Modal>
    </div>
  );
};

export default MainPage;
