import express from "express";
import {
  placeOrder,
  getUserOrders,
   getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/:userId", getUserOrders);
router.post("/", placeOrder);

// ===============================
// Admin Routes
// ===============================
router.get("/", getAllOrders);

router.put("/:id", updateOrder);

router.delete("/:id", deleteOrder);

export default router;