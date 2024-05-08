import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaGoogle, FaFacebook } from "react-icons/fa";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="w-96 bg-white shadow-md rounded p-8">
        <h1 className="text-3xl font-semibold mb-6 text-center">CREATE AN ACCOUNT</h1>
        <form>
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
          <div className="text-xs text-gray-500 mb-4">
            By creating an account, I consent to the processing of my personal data in accordance with the{" "}
            {/* <Link to="/privacy-policy" className="text-blue-500 underline">
              PRIVACY POLICY
            </Link> */}
          </div>
          <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded mb-2">
            <FaGoogle className="mr-2 inline-block" /> Sign in with Google
          </button>
          <button className="w-full bg-blue-700 text-white mb-2 font-bold py-2 px-4 rounded">
            <FaFacebook className="mr-2 inline-block" /> Sign in with Facebook
          </button>
          <button className="w-full bg-blue-500 text-white  font-bold py-2 px-4 rounded " disabled={!firstname || !lastname || !username || !email || !password || !confirmpassword}>
            CREATE ACCOUNT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
