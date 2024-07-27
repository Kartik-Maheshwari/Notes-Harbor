import express from 'express';
import { getUploadsByUser, updateUpload } from '../controllers/uploadController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, getUploadsByUser);
router.put('/:uploadId', authenticate, updateUpload);

export default router;
