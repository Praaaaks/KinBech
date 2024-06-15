import express from "express";

import { createProduct } from "../controllers/productCtrl.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

router.post("/create", authenticate, createProduct);

export default router;