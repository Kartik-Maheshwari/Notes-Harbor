import bcrypt from "bcrypt";
import User from "../models/Userchema.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

//signup route handlre

export const signup = async (req, res) => {
  try {
    const { username, email, password, firstname, lastname, cnfpassword } =
      req.body;

    //Check if user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exits",
      });
    }

    //if cnfpswd not equal to pswd
    if (password !== cnfpassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm password does not match",
      });
    }
    //secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10); //.hash fucntion takes two arguments first one is the password which is to be hashed and second is the number of rounds of hashing generally we take 10.
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "error in hashing password",
      });
    }

    const user = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot to registered",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter both the details",
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not registered Please Signup",
      });
    }
    const payload = {
      email: user.email,
      id: user._id,
      //   role: user.role,
    };
    //verify password & generate JWT token
    if (await bcrypt.compare(password, user.password)) {
      //if password matches token generation
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user = user.toObject();
      user.token = token;
      user.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 100),
        httpOnly: true,
      };
      //cookie requires three arguments: cookie name,cookie ka data, cookie ke kuch options
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User logged in successfully",
      });
    } else {
      //if password do not matches
      return res.status(403).json({
        success: false,
        message: "Password incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure",
    });
  }
};

//logout route handler
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};
