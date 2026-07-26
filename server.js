import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

import userRoutes from "./routes/userRoutes.js";

import analyticsRoutes from "./routes/analyticsRoutes.js";


import adminRoutes from "./routes/adminRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/cart", cartRoutes);

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/brands", brandRoutes);
app.use("/api/categories", categoryRoutes);

app.use("/api/users", userRoutes);

app.use("/api/analytics", analyticsRoutes);


app.get("/", (req, res) => {
  res.send("TimeLuxe Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});