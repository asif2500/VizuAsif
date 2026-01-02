import asyncHandler from "express-async-handler";
import PricingPlan from "../models/pricingPlan.model.js";

export const createPricingPlan = asyncHandler(async (req, res) => {
  const { name, monthlyFee, perModel } = req.body;

  if (!name || monthlyFee === undefined || perModel === undefined) {
    return res.status(400).json({
      success: false,
      error: "All fields are required",
    });
  }

  const nameExists = await PricingPlan.findOne({ name });
  if (nameExists) {
    return res.status(400).json({
      success: false,
      error: "Pricing plan with this name already exists",
    });
  }

  const plan = await PricingPlan.create({
    name,
    monthlyFee,
    perModel,
  });

  res.status(201).json({
    success: true,
    data: plan,
  });
});

export const getPricingPlans = asyncHandler(async (_, res) => {
  const plans = await PricingPlan.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: plans,
  });
});

export const updatePricingPlan = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const plan = await PricingPlan.findById(id);
  if (!plan) {
    return res.status(404).json({
      success: false,
      error: "Pricing plan not found",
    });
  }

  Object.assign(plan, req.body);
  await plan.save();

  res.status(200).json({
    success: true,
    message: "Pricing plan updated",
    data: plan,
  });
});

export const deletePricingPlan = asyncHandler(async (req, res) => {
  await PricingPlan.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Pricing plan deleted",
  });
});
