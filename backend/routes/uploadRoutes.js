import express from "express";
import {
  getAllUploads,
  getUploadsByUser,
  updateUpload,
  fileupload,
} from "../controllers/uploadController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/all", getAllUploads);
router.post("/", authenticate, fileupload);
router.put("/:uploadId", authenticate, updateUpload);
router.get("/user", authenticate, getUploadsByUser);

export default router;
