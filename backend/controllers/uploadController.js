// controllers/uploadController.js
const Upload = require('../models/Uploads.js');

exports.getUploadsByUser = async (req, res) => {
  try {
    const uploads = await Upload.find({ userId: req.user._id });
    res.status(200).json(uploads);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch uploads', error });
  }
};

exports.updateUpload = async (req, res) => {
  const { uploadId } = req.params;
  const { title, description, previewImg } = req.body;

  try {
    const upload = await Upload.findByIdAndUpdate(uploadId, { title, description, previewImg }, { new: true });
    if (!upload) return res.status(404).json({ message: 'Upload not found' });
    res.status(200).json(upload);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update upload', error });
  }
};
