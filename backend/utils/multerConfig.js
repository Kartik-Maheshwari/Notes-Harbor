// multerConfig.js
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from './cloudinaryConfig.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => 'jpeg' || 'png', // supports promises as well
    public_id: (req, file) => file.originalname,
  },
});

const upload = multer({ storage });

export default upload;
