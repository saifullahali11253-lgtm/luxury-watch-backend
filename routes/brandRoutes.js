import express from "express";
import { getBrands } from "../controllers/brandController.js";

const router = express.Router();

// Get All Brands
router.get("/", getBrands);

export default router;