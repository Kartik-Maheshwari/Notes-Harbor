// routes/uploadRoutes.js
import express from 'express';
import { uploadFile } from '../controllers/uploadCloud.js';
import upload from '../utils/multerConfig.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/uploadCloud', authenticate, upload.single('file'), uploadFile);

export default router;
