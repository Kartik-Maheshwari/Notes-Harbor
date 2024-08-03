import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const message = location.state?.message || "";

  const handleLogin = async (event) => {
    setError("");
    setSuccess("");
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/v1/auth/login", {
        email: email,
        password: password,
      });

      if (response.data.success) {
        dispatch(login(response.data.user));
        setSuccess("Login successful! Redirecting to homepage...");
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful! Redirecting to homepage...");
        setTimeout(() => {
          console.log("Navigating to homepage"); // Debugging log
          navigate("/");
        }, 2000);
      } else {
        setError(response.data.message);
        toast.error(response.data.message, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      toast.error(error.response?.data?.message || "An error occurred", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-blue">
      <ToastContainer />
      <div className="w-96 bg-white shadow-md rounded p-8 animate-fadeIn">
        <h1 className="text-3xl font-bold mb-6 text-center text-dark-blue">LOGIN</h1>
        {message && (
          <div className="text-green-500 text-sm mb-4">{message}</div>
        )}
        <form onSubmit={handleLogin}>
          <input
            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 mb-4 text-dark-blue"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <div className="relative">
            <input
              className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 mb-4 pr-10 text-dark-blue"
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
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
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
