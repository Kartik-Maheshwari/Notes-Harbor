import React from "react";
import Card from "../components/Card.jsx";
import Cards from "../components/Cards.jsx";
import { FaFilter } from "react-icons/fa6"; // Import your filter icon

const MainPage = () => {
  const [selectedFilter, setSelectedFilter] = React.useState("all"); // Initial filter state

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="profile-section flex flex-col justify-center items-center md:flex-row md:justify-between md:items-center bg-slate-600 p-3 py-5 rounded-lg">
        <img
          src="path/to/profile-picture.jpg"
          alt="Profile Picture"
          className="profile-picture rounded-full h-16 w-16 border border-gray-300" // Ensure circular class is applied
        />
        <div className="profile-buttons flex gap-4 mt-4 md:mt-0">
          {" "}
          <button className="profile-button px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
            Activity
          </button>
          <button className="profile-button px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
            Details
          </button>
          <button className="profile-button px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
            Tickets
          </button>
        </div>
      </div>
      <div className="filter-container flex flex-col justify-center items-center md:flex-row md:justify-end md:items-center">
        <div className="filter-dropdown flex items-center space-x-2">
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            className="filter-select px-3 py-2 rounded-md text-gray-700 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="most-rated">Most Rated</option>
            <option value="latest">Latest</option>
            {/* Add more options here */}
          </select>
          <button className="filter-button flex items-center space-x-1 px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700">
            <FaFilter className="filter-icon h-4 w-4" />
            Filters
          </button>
        </div>
      </div>
      <div className="max-w-[85%] mx-auto gap-3">
        <Cards selectedFilter={selectedFilter} />
      </div>
    </div>
  );
};

export default MainPage;
