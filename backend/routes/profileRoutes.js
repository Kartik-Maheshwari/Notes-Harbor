import express from "express";
import { getProfile, updateProfile,getAllUsers } from "../controllers/profileController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticate, getProfile);
router.put("/update", authenticate, updateProfile);
router.get("/allusers"  ,getAllUsers )

export default router;
