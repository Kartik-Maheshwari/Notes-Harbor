// controllers/uploadController.js
import cloudinary from '../utils/cloudinaryConfig.js';
import Upload from '../models/uploadcloudModel.js';

const uploadFile = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'uploads',
    });

    const newUpload = new Upload({
      url: result.secure_url,
      public_id: result.public_id,
    });

    await newUpload.save();

    res.status(200).json({ message: 'File uploaded successfully', url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload file', error });
  }
};

export { uploadFile };
