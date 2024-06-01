import express from "express";
const router = express.Router();
import { signup, login } from "../controllers/Auth.js";

router.post("/signup", signup);
router.post("/login", login);

// modul.exports = router;
export default router;
