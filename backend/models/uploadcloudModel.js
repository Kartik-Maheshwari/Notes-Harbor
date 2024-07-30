// models/Upload.js
import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Upload = mongoose.model('Upload', uploadSchema);

export default Upload;
