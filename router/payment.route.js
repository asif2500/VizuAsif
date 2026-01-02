import { Router } from "express";
import {
  createPayment,
  getPayments,
  deletePayment,
  updatePayment,
} from "../controller/payment.controller.js";

const paymentRoute = Router();

paymentRoute.post("/", createPayment);
paymentRoute.get("/", getPayments);
paymentRoute.delete("/:id", deletePayment);
paymentRoute.put("/:id", updatePayment);

export default paymentRoute;
