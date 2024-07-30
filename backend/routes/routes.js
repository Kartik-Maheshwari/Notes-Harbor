// import express from "express";
// import { getProfile } from '../controllers/profileController.js';
// import { authenticate } from '../middleware/auth.js';

// const router = express.Router();
// import { signup, login, logout } from "../controllers/Auth.js";
// import { updateUpload } from "../controllers/uploadController.js";
// import {
//   getFollowingsByUser,
//   unfollowUser,
// } from "../controllers/followingController.js";
// import {
//   getFollowersByUser,
//   removeFollower,
//   blockFollower,
// } from "../controllers/followerController.js";

// import { getUploadsByUser } from "../controllers/uploadController.js";
// import { authenticate } from "../middleware/auth.js";

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/logout", logout);

// // uploads routes
// router.get("/", login, getUploadsByUser);
// router.put("/:uploadId", updateUpload);

// // followers routes
// router.get("/", login, getFollowersByUser);
// router.delete("/:followerId", login, removeFollower);
// router.post("/block/:followerId", login, blockFollower); //block follower to be written

// // following routes
// router.get("/", authenticate, getFollowingsByUser);
// router.delete("/:followingId", authenticate, unfollowUser);

// //   profile data
// router.get('/', authenticate, getProfile);

// export default router;

import express from "express";
import authRoutes from "./authRoutes.js";
import uploadRoutes from "./uploadRoutes.js";
import followerRoutes from "./followerRoutes.js";
import followingRoutes from "./followingRoutes.js";
import profileRoutes from "./profileRoutes.js";
import uploadCloudRoutes from "./uploadCloudRoute.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/uploads", uploadRoutes);
router.use("/followers", followerRoutes);
router.use("/followings", followingRoutes);
router.use("/profile", profileRoutes);
router.use("/uploadCloud", uploadCloudRoutes);

export default router;
