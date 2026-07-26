import express from "express";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// ===============================
// Get All Products
// ===============================
router.get("/", getProducts);

// ===============================
// Add Product
// ===============================
router.post("/", addProduct);

// ===============================
// Update Product
// ===============================
router.put("/:id", updateProduct);

// ===============================
// Delete Product
// ===============================
router.delete("/:id", deleteProduct);

export default router;