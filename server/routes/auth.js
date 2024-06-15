import express from "express";

import { signup, login, getMe, logout } from "../controllers/authCtrl.js"
import authenticate from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/me", authenticate, getMe);
router.get("/logout", logout)

export default router;