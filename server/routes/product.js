import express from "express";

import { addBookmark, checkBookmark, createProduct, deleteBookmark, deleteProduct, getAll, getBookmarks, getMyProducts, getProduct, getProductBySearch } from "../controllers/productCtrl.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

router.post("/create", authenticate, createProduct);
router.get("/popular", getAll);
router.get("/getmyproducts", authenticate, getMyProducts);
router.get("/get/:_id", getProduct);
router.get("/getbookmark", authenticate, getBookmarks);
router.delete("/delete/:_id", authenticate, deleteProduct);
router.post("/addbookmark", authenticate, addBookmark);
router.post("/deletebookmark", authenticate, deleteBookmark);
router.get("/checkbookmark/:_id", authenticate, checkBookmark);
router.get("/search", getProductBySearch);

export default router;