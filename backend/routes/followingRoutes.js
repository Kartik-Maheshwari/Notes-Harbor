import express from 'express';
import { getFollowingsByUser, unfollowUser } from '../controllers/followingController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, getFollowingsByUser);
router.delete('/:followingId', authenticate, unfollowUser);

export default router;
