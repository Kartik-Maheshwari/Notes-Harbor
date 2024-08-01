// const cloudinary = require("cloudinary").v2;
// require("dotenv").config();

import cloudinary from "cloudinary";
import "dotenv/config";

export const cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    console.log("Connection to cloudinary is also successfull");
  } catch (error) {
    console.log(error);
  }
};
