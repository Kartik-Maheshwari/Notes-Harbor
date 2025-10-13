import express from "express";
import {
  getAllUploads,
  getUploadsByUser,
  updateUpload,
  fileupload,
  getCardById,
  liked,
  getliked,
} from "../controllers/uploadController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/all", getAllUploads);
router.get("/:id", getCardById);
router.get("/user/notes", authenticate, getUploadsByUser);
router.post("/", authenticate, fileupload);
router.put("/:uploadId", authenticate, updateUpload);
router.post("/like", authenticate, liked);
router.get("/:noteId/likes", getliked);

export default router;
