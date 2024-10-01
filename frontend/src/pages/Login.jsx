import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
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
        email,
        password,
      });

      if (response.data.success) {
        dispatch(login(response.data.user));
        setSuccess("Login successful! Redirecting to homepage...");
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful! Redirecting to homepage...");
        setTimeout(() => {
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

  useEffect(() => {
    const handleTabClose = () => {
      localStorage.removeItem("token");
      dispatch(logout());
    };
    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [dispatch]);

  return (
    <div className=" m-10 border-4 border rounded-lg   max-w-500 grid  gap-5 grid-cols-1 md:grid-cols-2 p-10 overflow-y-hidden">

      {/* Left Section: Image */}
      <div className="flex items-center justify-center bg-white">
        <img src="/image/login.png" alt="Login Illustration" className="w-3/4" />
      </div>

      {/* Right Section: Login Form */}
      <div className="flex items-center justify-center bg-blue-600   rounded-lg p-">
        <div className="w-3/4 max-w-md">
          <h1 className="text-white text-3xl font-semibold mb-4">Welcome Back!</h1>
          <p className="text-white mb-6">
            Don't have an account yet?{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>

          {message && <div className="text-green-500 text-sm mb-4">{message}</div>}

          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <input
              type="email"
              placeholder="Username"
              className="w-full px-4 py-2 mb-4 text-lg border-2 border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-2 mb-4 text-lg border-2 border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>

            {/* Keep Me Logged In & Forgot Password */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-white">
                <input type="checkbox" className="mr-2" />
                Keep me logged in
              </label>
              <a href="#" className="text-white underline">
                Forgot Password?
              </a>
            </div>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            {success && <div className="text-green-500 text-sm mb-4">{success}</div>}

            {/* Login Button */}
            <button
              className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              type="submit"
              disabled={!email || !password}
            >
              Login
            </button>
          </form>

          {/* Privacy Policy */}
          <div className="text-center text-xs text-white mt-4">
            <a href="/privacy-policy" className="underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default LoginPage;
