import express from "express";

import {
  followUser,
  unfollowUser,
  getUserFollowings,
  getUserFollowers,
} from "../controllers/FollowController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.put("/:id/follow", authenticate, followUser);
router.put("/:id/unfollow", authenticate, unfollowUser);

// Fetch the followings of the logged-in user
router.get("/followings", authenticate, getUserFollowings);

// Fetch the followers of the logged-in user
router.get("/followers", authenticate, getUserFollowers);

export default router;
