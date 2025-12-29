import asyncHandler from "express-async-handler";
import { hash, compare } from "bcryptjs";
import User from "../model/restaurant.model.js";

export const createRestaurant = asyncHandler(async (req, res) => {
  const { phone, password, name } = req.body;

  if (!phone || !password || !name) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const exists = await User.findOne({ phone });
  if (exists) {
    return res.status(400).json({ error: "Restaurant already exists" });
  }

  const hashedPassword = await hash(password, 10);

  const restaurant = await User.create({
    phone,
    password: hashedPassword,
    name,
    role: "RESTAURANT",
    isActive: false, // activate after payment
    subscriptionStatus: "inactive",
  });

  res.status(201).json({
    success: true,
    message: "Restaurant created",
    restaurantId: restaurant._id,
  });
});

export const loginRestaurant = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const restaurant = await User.findOne({ phone });
  if (!restaurant) {
    return res.status(400).json({ error: "Restaurant not found" });
  }

  const isMatch = await compare(password, restaurant.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  res.status(200).json({
    message: "Restaurant logged in",
    restaurantId: restaurant._id,
  });
});

export const getAllRestaurant = asyncHandler(async (req, res) => {
  const restaurants = await User.find({ role: "RESTAURANT" });
  res.status(200).json({ success: true, data: restaurants.reverse() });
});

export const getRestaurantById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const restaurant = await User.findById(id);
  if (!restaurant) {
    return res.status(400).json({ error: "Restaurant not found" });
  }
  res.status(200).json({ success: true, data: restaurant });
});

export const deleteRestaurant = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const restaurant = await User.findByIdAndDelete(id);
  if (!restaurant) {
    return res.status(400).json({ error: "Restaurant not found" });
  }
  res.status(200).json({ success: true, message: "Restaurant deleted" });
});
