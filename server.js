import cors from "cors";
import express from "express";

import connectDB from "./utils/db.js";
import modelRoute from "./router/model.routes.js";
import adminRoutes from "./router/admin.routes.js";
import restaurantRoutes from "./router/restaurant.routes.js";

const app = express();
connectDB();

// Fix 1: Add credentials: true and remove trailing slash
const allowedOrigin = "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true, // IMPORTANT: Add this
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Add OPTIONS for preflight
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/uploads", modelRoute);
app.use("/api/rest", restaurantRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
