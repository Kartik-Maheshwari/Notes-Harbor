// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, require: true, unique: true },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    followers: { type: Array, default: [] },
    followings: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false },
    institution: { type: String, max: 50 },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Upload" }],
    additionalDetails: {
      about: { type: String, default: "" },
      gender: { type: String, default: "" },
      contactNumber: { type: String, default: "" },
      dateOfBirth: { type: Date, default: null },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
