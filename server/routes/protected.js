import express from "express";

import authenticate from "../middleware/auth.js";
import { getMe } from "../controllers/authCtrl.js";

const router = express.Router();

router.get("/profile", authenticate, getMe);

export default router;