import express from "express";

import {
  addToCart,
  getCart,
  increaseQuantity,
  decreaseQuantity,
   removeCartItem,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/", addToCart);
router.get("/", getCart);
router.put("/increase/:id", increaseQuantity);
router.put("/decrease/:id", decreaseQuantity);
router.delete("/:id", removeCartItem);

export default router;