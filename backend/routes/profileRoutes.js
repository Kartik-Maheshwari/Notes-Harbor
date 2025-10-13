import express from "express";
import {
  getProfile,
  updateProfile,
  getAllUsers,
} from "../controllers/profileController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticate, getProfile);
router.put("/update", authenticate, updateProfile);
router.get("/allusers", getAllUsers);

router.get("/leaderboard", async (req, res) => {
  try {
    const users = await User.find().sort({ totalLikes: -1 }).limit(10);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
