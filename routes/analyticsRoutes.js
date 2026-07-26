import express from "express";
import { getAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();

// ===============================
// Get Analytics
// ===============================
router.get("/", getAnalytics);

export default router;