import express from 'express';
import { getFollowersByUser, removeFollower, blockFollower } from '../controllers/followerController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, getFollowersByUser);
router.delete('/:followerId', authenticate, removeFollower);
router.post('/block/:followerId', authenticate, blockFollower);

export default router;
