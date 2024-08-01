import express from "express";
import { getProfile } from "../controllers/profileController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticate, getProfile);

export default router;
