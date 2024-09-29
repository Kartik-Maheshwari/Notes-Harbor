// models/Upload.js
import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  tags: {
    type: String,
  },
  asset_id: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  previewImg: { type: String, required: true },
  secure_url: { type: String },
  createdAt: { type: Date, default: Date.now },
  subjectName: { type: String },
  semester: { type: String },
  year: { type: Number },
  rating: { type: Number, default: 0 },
  isMiscellaneous: { type: Boolean, default: false },
});

const Upload = mongoose.model("Upload", uploadSchema);

export default Upload;
