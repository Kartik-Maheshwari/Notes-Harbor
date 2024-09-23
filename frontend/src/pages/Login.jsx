import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    setError("");
    setSuccess("");
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/v1/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        dispatch(login({ user: response.data.user, token: response.data.token }));
        setSuccess("Login successful! Redirecting to homepage...");
        toast.success("Login successful! Redirecting to homepage...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-blue">
      <ToastContainer />
      <div className="w-96 bg-white shadow-md rounded p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-dark-blue">LOGIN</h1>
        <form onSubmit={handleLogin}>
          <input
            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 mb-4 text-dark-blue"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <input
            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 mb-4 text-dark-blue"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          {success && <div className="text-green-500 text-sm mb-4">{success}</div>}
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
