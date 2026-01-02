import cors from "cors";
import express from "express";

import connectDB from "./utils/db.js";
import modelRoute from "./router/3dmodel.routes.js";
import adminRoutes from "./router/admin.routes.js";
import restaurantRoutes from "./router/restaurant.routes.js";
import pricingPlanRoutes from "./router/pricingPlan.route.js";
import PaymentRoutes from "./router/payment.route.js";

const app = express();
connectDB();

// Fix 1: Add credentials: true and remove trailing slash
// const allowedOrigin = "http://localhost:5173" || 'https://famous-maamoul-d7fe87.netlify.app';

app.use(
  cors({
    origin: "http://localhost:5173",
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
app.use("/api/pricing-plan", pricingPlanRoutes);
app.use("/api/payment", PaymentRoutes);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
