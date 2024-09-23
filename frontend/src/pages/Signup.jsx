import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmpassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/v1/auth/signup", {
        firstname,
        lastname,
        username,
        email,
        password,
        cnfpassword: confirmpassword,
      });

      if (response.data.success) {
        setSuccess("Account created successfully!");
        toast.success("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      setError(error.response.data.message || "An error occurred");
      toast.error(error.response.data.message || "An error occurred");
    }
  };

  return (
    <div className="m-10 border-4 border rounded-lg max-w-500 grid gap-5 grid-cols-1 md:grid-cols-2 p-10 overflow-hidden">
      {/* Left Section: Image */}
     

      {/* Right Section: Signup Form */}
      <div className="flex items-center justify-center bg-blue-600 rounded-lg p-5">
        <div className="w-3/4 max-w-md">
          <h1 className="text-white text-3xl font-semibold mb-4">Create an Account</h1>
          <p className="text-white mb-6">
            Already have an account?{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>

          <form onSubmit={handleSignup}>
            {/* First Name & Last Name Fields */}
            <div className="flex space-x-4 mb-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-4 py-2 text-lg border-2 border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-4 py-2 text-lg border-2 border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>

            {/* Username Field */}
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 mb-4 text-lg border-2 border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            {/* Email Field */}
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-4 text-lg border-2 border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Field */}
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-2 text-lg border-2 border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff className="text-white" /> : <FiEye className="text-white" />}
              </div>
            </div>

            {/* Confirm Password Field */}
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 mb-4 text-lg border-2 border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            {success && <div className="text-green-500 text-sm mb-4">{success}</div>}

            {/* Signup Button */}
            <button
              className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              type="submit"
              disabled={!firstname || !lastname || !username || !email || !password || !confirmpassword}
            >
              Create Account
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
      <div className="flex items-center justify-center bg-white">
        <img src="/image/sign.png" alt="Signup Illustration" className="w-3/4" />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Signup;
