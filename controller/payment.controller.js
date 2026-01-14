import asyncHandler from "express-async-handler";
import Payment from "../models/payment.model.js";
import restaurant from "../models/restaurant.model.js";

export const createPayment = asyncHandler(async (req, res) => {
  const {
    modelID,
    restaurantID,
    pricingPlanID,
    paymentMethod,
    transactionId,
    chequeNumber,
  } = req.body;

  // 1️⃣ Find restaurant
  const restaurantData = await restaurant.findById(restaurantID);
  if (!restaurantData) {
    return res.status(404).json({
      success: false,
      error: "Restaurant not found",
    });
  }

  // 2️⃣ Find pricing plan inside restaurant.models
  const modelItem = restaurantData.models.find(
    (m) => m.pricePlanID.toString() === pricingPlanID
  );

  if (!modelItem) {
    return res.status(404).json({
      success: false,
      error: "Pricing plan not found for this restaurant",
    });
  }

  // 3️⃣ Activate model & restaurant
  modelItem.isActive = true;
  restaurantData.isActive = true;
  restaurant.subscriptionStatus = "active";

  // 4️⃣ Calculate amounts
  const oneTimeAmount = modelItem.count * modelItem.pricePlanID.perModel;
  const monthlyAmount = modelItem.pricePlanID.monthlyFee;

  // 5️⃣ Create payment
  const payment = await Payment.create({
    modelID,
    restaurant: restaurantID,
    pricingPlan: pricingPlanID,
    count: modelItem.count,
    oneTimeAmount,
    monthlyAmount,
    paymentMethod,
    transactionId: paymentMethod === "bank" ? transactionId : null,
    chequeNumber: paymentMethod === "cheque" ? chequeNumber : null,
    isPaid: true,
    paidAt: new Date(),
  });

  // 6️⃣ Save restaurant
  await restaurantData.save();

  res.status(201).json({
    success: true,
    message: "Payment successful & model activated",
    data: payment,
  });
});

export const getPayments = asyncHandler(async (req, res) => {});

export const deletePayment = asyncHandler(async (req, res) => {});

export const updatePayment = asyncHandler(async (req, res) => {});
