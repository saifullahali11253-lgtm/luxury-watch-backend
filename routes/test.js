import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Supabase connected successfully!",
  });
});

export default router;