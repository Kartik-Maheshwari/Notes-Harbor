import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticate, getProfile);
router.put("/update", authenticate, updateProfile);

export default router;
