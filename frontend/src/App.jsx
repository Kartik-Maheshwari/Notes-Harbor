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

function App() {
   const data = {

   }
  return (
    <Router>
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings/>} />
          <Route path="leaderboard" element={<Leaderboard />}/>
          <Route path="singlecard" element={<SingleCard />}/>
          <Route path="/" element={<MainPage/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
