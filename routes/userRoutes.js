import express from "express";

import {
  getUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// ===============================
// Get All Users
// ===============================
router.get("/", getUsers);

// ===============================
// Update User Role
// ===============================
router.put("/:id", updateUserRole);

// ===============================
// Delete User
// ===============================
router.delete("/:id", deleteUser);

export default router;