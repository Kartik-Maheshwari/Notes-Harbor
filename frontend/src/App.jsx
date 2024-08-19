import "./App.css";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import MainPage from "./pages/MainPage.jsx";
import Leaderboard from "./pages/LeaderBoard.jsx";
import { useState } from "react";
import SingleCard from "./components/SingleCard.jsx";
import ManageUploads from "./components/ManageUploads";
import ManageFollowers from "./components/ManageFollowers";
import ManageFollowing from "./components/ManageFollowing";
import AccountSettings from "./components/AccountSettings";



const sampleProfilePic = 'https://placeimg.com/64/64/people';
const sampleName = 'Jane Smith';
const sampleImage = 'https://placeimg.com/640/480/arch';
const sampleTitle = 'A Beautiful Landscape';
const sampleDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...';

function App() {
  const data = {};
  return (
    <Router>
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          
          <Route path="/" element={<MainPage />} />
          <Route path="/singlecard" element={<SingleCard 
            
          />} />
          <Route path="/settings/uploads" element={<ManageUploads />} />
          <Route path="/settings/followers" element={<ManageFollowers />} />
          <Route path="/settings/following" element={<ManageFollowing />} />
          <Route
            path="/settings/account-settings"
            element={<AccountSettings />}
            
          />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
