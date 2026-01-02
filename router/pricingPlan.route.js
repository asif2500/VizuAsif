import { Router } from "express";
import {
  createPricingPlan,
  getPricingPlans,
  deletePricingPlan,
  updatePricingPlan,
} from "../controller/pricingPlan.controller.js";

const paymentRoute = Router();

paymentRoute.post("/", createPricingPlan);
paymentRoute.get("/", getPricingPlans);
paymentRoute.delete("/:id", deletePricingPlan);
paymentRoute.put("/:id", updatePricingPlan);

export default paymentRoute;
