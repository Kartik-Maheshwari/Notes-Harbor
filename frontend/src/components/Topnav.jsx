// src/components/TopNav.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiSearchLine, RiUserLine, RiMenuLine } from "react-icons/ri";
import { MdLeaderboard } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaPeopleGroup } from "react-icons/fa6";

const TopNav = () => {
  const [search, setSearch] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.error("Log out successful! Redirecting to homepage...");
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const searchSubmit = (e) => {
    e.preventDefault();
  };

  const menuClickHandler = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="fixed h-16 top-0 left-0 w-full bg-gray-800 z-10 p-4 flex items-center justify-between">
      <ToastContainer />
      <div className="flex items-center">
        <p className="text-white font-bold">HandNotes</p>
      </div>

      {isLoggedIn && (
        <div className="hidden md:flex items-center w-full max-w-md mx-auto">
          <form className="flex items-center w-full" onSubmit={searchSubmit}>
            <input
              type="text"
              placeholder="Search for notes"
              className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 flex items-center bg-gray-800 text-white rounded-full p-2"
            >
              <RiSearchLine className="text-white" />
            </button>
          </form>
        </div>
      )}

      <div className="flex items-center">
        <Link to="/" className="text-white ml-4">Home</Link>
        {isLoggedIn && <Link to="/profile" className="text-white ml-4">Profile</Link>}
        {isLoggedIn && <Link to="/settings" className="text-white ml-4">Settings</Link>}
        {isLoggedIn && <Link to="/allusers" className="text-white ml-4"><FaPeopleGroup /></Link>}
        <Link to="/leaderboard" className="text-white ml-4"><MdLeaderboard /></Link>
        <button
          className="text-white ml-4 md:hidden"
          onClick={menuClickHandler}
        >
          <RiMenuLine size={24} />
        </button>
        {isLoggedIn ? (
          <button className="text-white ml-4" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="text-white ml-4">Login</Link>
            <Link to="/signup" className="text-white ml-4">Sign Up</Link>
          </>
        )}
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col items-center md:hidden">
          <Link to="/" className="text-white my-2">Home</Link>
          {isLoggedIn && <Link to="/profile" className="text-white my-2">Profile</Link>}
          {isLoggedIn && <Link to="/settings" className="text-white my-2">Settings</Link>}
          <Link to="/leaderboard" className="text-white my-2"><MdLeaderboard /></Link>
          {isLoggedIn ? (
            <button className="text-white my-2" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-white my-2">Login</Link>
              <Link to="/signup" className="text-white my-2">Sign Up</Link>
             
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TopNav;