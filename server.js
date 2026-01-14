import cors from "cors";
import express,
{json,urlencoded,static as expressStatic} from "express";

import connectDB from "./utils/db.js";
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
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/uploads", expressStatic("uploads"));

app.use("/api/rest", restaurantRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/pricing-plan", pricingPlanRoutes);
app.use("/api/payment", PaymentRoutes);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
