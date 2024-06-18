import express from "express";

import { createProduct, deleteProduct, getMyProducts, getProduct, getProductBySearch } from "../controllers/productCtrl.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

router.post("/create", authenticate, createProduct);
router.get("/popular", getProductBySearch);
router.get("/getmyproducts", authenticate, getMyProducts);
router.get("/get/:_id", getProduct);
router.delete("/delete/:_id", authenticate, deleteProduct);
// router.get("/search", getProductBySearch);

export default router;