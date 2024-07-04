// Login.jsx

import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation for getting state from navigation
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Check if there's a message in location state (from Signup redirect)
  const message = location.state?.message || "";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:3000/v1/login", {
        email,
        password,
      });

      if (response.data.success) {
        setSuccess("Login successful! Redirecting to homepage...");
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          navigate("/");
        }, 2000); // Redirect after 2 seconds
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response.data.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="w-96 bg-white shadow-md rounded p-8">
        <h1 className="text-3xl font-semibold mb-6 text-center">LOGIN</h1>
        {message && (
          <div className="text-green-500 text-sm mb-4">{message}</div>
        )}
        <form onSubmit={handleLogin}>
          <input
            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 mb-4"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <div className="relative">
            <input
              className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 mb-4 pr-10"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              required
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center mb-5 pr-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          {success && (
            <div className="text-green-500 text-sm mb-4">{success}</div>
          )}
          <div className="text-xs text-gray-500 mb-4">
            By logging in, I consent to the processing of my personal data in
            accordance with the{" "}
            <a href="/privacy-policy" className="text-blue-500 underline">
              PRIVACY POLICY
            </a>
          </div>
          <button
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded mb-2"
            type="submit"
            disabled={!email || !password}
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
