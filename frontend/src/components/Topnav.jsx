import React from "react";
import { useState } from "react";
// import { AiOutlineLibrary } from 'react-icons/ai';
import { RiCloseLine } from 'react-icons/ri';

const Topnav = () => {
  const [search, setSearch] = useState("");
  const [placeholder, setPlaceholder] = useState(""); // Placeholder state for the search input
  
  const searchSubmit = (e) => {
    e.preventDefault();
    // Add search functionality here
  };

  const menuClickHandler = () => {
    // Add menu click functionality here
  };

  return (
    <>
     <div className="flex-col gap-5  justify-center w-full">
     <div className="topbar bg-gradient-to-r from-blue-500 to-purple-500 p-4 flex justify-between items-center">
        <div className="topbar-left flex items-center">
          <span className="topbar-left-icon text-white">
            {/* <AiOutlineLibrary /> */}
          </span>
          <p className="topbar-title text-white">HandNotes</p>
          <img
            src="pfDefaultPic.png" // Placeholder image
            alt="Profile"
            className="topbar-right-Img-left cursor-pointer"
            onClick={menuClickHandler}
          />
        </div>
        <div className="topbar-center flex items-center flex-grow">
          <form className="search-form flex items-center" onSubmit={searchSubmit}>
            <input
              type="text"
              placeholder={`Search for notes ${placeholder}`}
              className="topbar-center-input flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="ml-2 flex items-center justify-center bg-gray-800 text-white rounded-full p-2">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/search--v2.png"
                className="topbar-center-icon"
                alt="Search"
              />
            </button>
          </form>
        </div>
        <div className="topbar-right">
          <img
            src="https://img.icons8.com/color/48/undefined/facebook-messenger--v1.png"
            alt="Messenger"
            className="messenger-icon cursor-pointer"
          />
        </div>
      </div>

      <div className="menu" style={{ height: "100vh" }}>
        {/* Menu content */}
      </div>
     </div>
    </>
  );
};

export default Topnav;
