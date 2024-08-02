// controllers/uploadController.js
import Upload from "../models/Uploads.js";
import User from "../models/Userchema.js";

import { v2 as cloudinary } from "cloudinary";

export const getUploadsByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const uploads = await Upload.find({ userId });

    res.status(200).json(uploads);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch uploads for user", error });
  }
};

export const getAllUploads = async (req, res) => {
  try {
    const resources = await cloudinary.api.resources({
      type: "upload", // Specifies that we're fetching uploaded files
      prefix: "Codehelp",
      max_results: 100, // Adjust the number as needed
    });

    res.status(200).json(resources.resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch resources", error });
  }
};

export const updateUpload = async (req, res) => {
  const { uploadId } = req.params;
  const { title, description, previewImg } = req.body;

  try {
    const upload = await Upload.findByIdAndUpdate(
      uploadId,
      { title, description, previewImg },
      { new: true }
    );
    if (!upload) return res.status(404).json({ message: "Upload not found" });
    res.status(200).json(upload);
  } catch (error) {
    res.status(500).json({ message: "Failed to update upload", error });
  }
};

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, title, metadata = {}) {
  console.log("Title file ka ye hai: ", title);

  const options = {
    folder,
    public_id: title,
    context: metadata,
  };

  options.resource_type = "auto";
  // try {
  //   // Upload file to Cloudinary
  //   const result = await cloudinary.uploader.upload(file.tempFilePath, options);
  //   return result;
  // } catch (error) {
  //   console.error("Cloudinary upload failed:", error);
  //   throw error;
  // }
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

export const fileupload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email, title, description } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //Validation
    const supportedTypes = ["jpg", "jpeg", "png", "pdf"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    const trimmedTitle = title.trim();
    const metadata = {
      alt: "alttext",
      caption: description,
    };

    //file format is supported

    const response = await uploadFileToCloudinary(
      file,
      "Codehelp",
      trimmedTitle,
      metadata
    );
    console.log(response);

    //------------------------------------------------------------------

    //db ke andar entry save karni hai
    const fileData = await Upload.create({
      userId: req.user._id,
      name,
      tags,
      email,
      previewImg: response.secure_url, //ye url jab ham cloudinary ke response ko clg karenge to vaha se milega
      title,
      description,
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: { notes: fileData._id },
    });

    res.json({
      success: true,
      fileUrl: response.secure_url,
      message: "File successfully uploaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something wont wrong",
    });
  }
};
