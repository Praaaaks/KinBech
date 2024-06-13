import express from "express";

import { signup, login } from "../controllers/authCtrl.js"

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
// router.get('/user', getaUser);

export default router;