import express from "express";
const router = express.Router();
import { signup, login, logout } from "../controllers/Auth.js";
import { updateUpload } from "../controllers/uploadController.js";
import { getFollowingsByUser, unfollowUser } from "../controllers/followingController.js";
import { getFollowersByUser, removeFollower } from "../controllers/followerController.js";


router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// uploads routes
router.get('/', login, getUploadsByUser);
router.put('/:uploadId',updateUpload);

// followers routes
router.get('/', login, getFollowersByUser);
router.delete('/:followerId', login, removeFollower);
router.post('/block/:followerId', login, blockFollower); //block follower to be written

// following routes 
router.get('/', authenticate, getFollowingsByUser);
router.delete('/:followingId', authenticate, unfollowUser);



modul.exports = router;
export default router;
