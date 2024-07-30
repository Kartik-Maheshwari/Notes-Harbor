// Signup.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";

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
      const response = await axios.post(
        "http://localhost:3000/v1/auth/signup",
        {
          firstname,
          lastname,
          username,
          email,
          password,
          cnfpassword: confirmpassword,
        }
      );

      if (response.data.success) {
        setSuccess("Account created successfully!");
        setTimeout(() => {
          navigate("/login", {
            state: {
              message:
                "User registered successfully, please login to continue.",
            },
          });
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
        <h1 className="text-3xl font-semibold mb-6 text-center">
          CREATE AN ACCOUNT
        </h1>
        <form onSubmit={handleSignup}>
          <input
            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 mb-4"
            placeholder="First Name"
            onChange={(e) => setFirstname(e.target.value)}
            type="text"
            required
          />
          <input
            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 mb-4"
            placeholder="Last Name"
            onChange={(e) => setLastname(e.target.value)}
            type="text"
            required
          />
          <input
            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 mb-4"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            required
          />
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
          <input
            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 mb-4"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            required
          />
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          {success && (
            <div className="text-green-500 text-sm mb-4">{success}</div>
          )}
          <div className="text-xs text-gray-500 mb-4">
            By creating an account, I consent to the processing of my personal
            data in accordance with the{" "}
            <Link to="/privacy-policy" className="text-blue-500 underline">
              PRIVACY POLICY
            </Link>
          </div>
          <button
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded mb-2"
            type="submit"
            disabled={
              !firstname ||
              !lastname ||
              !username ||
              !email ||
              !password ||
              !confirmpassword
            }
          >
            CREATE ACCOUNT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
