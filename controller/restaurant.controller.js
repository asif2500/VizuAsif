import asyncHandler from "express-async-handler";
import { hash, compare } from "bcryptjs";
import User from "../models/restaurant.model.js";

export const createRestaurant = asyncHandler(async (req, res) => {
  const { phone, password, name } = req.body;

  if (!phone || !password || !name) {
    return res.status(400).json({ success: false, error: "Missing fields" });
  }

  const nameExists = await User.findOne({ name });
  const phoneExists = await User.findOne({ phone });
  if (nameExists || phoneExists) {
    return res
      .status(400)
      .json({ success: false, error: "Restaurant already exists" });
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
    data: restaurant,
  });
});

export const loginRestaurant = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ success: false, error: "Missing fields" });
  }

  const restaurant = await User.findOne({ phone });
  if (!restaurant) {
    return res
      .status(400)
      .json({ success: false, error: "Restaurant not found" });
  }

  const isMatch = await compare(password, restaurant.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid credentials" });
  }

  res.status(200).json({
    message: "Restaurant logged in",
    restaurantId: restaurant._id,
  });
});

export const updateRestaurant = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, phone, password } = req.body;

  const restaurant = await User.findById(id);
  if (!restaurant) {
    return res
      .status(400)
      .json({ success: false, error: "Restaurant not found" });
  }

  if (name) {
    restaurant.name = name;
  }
  if (phone) {
    restaurant.phone = phone;
  }
  if (password) {
    const hashedPassword = await hash(password, 10);
    restaurant.password = hashedPassword;
  }

  await restaurant.save();

  res.status(200).json({
    success: true,
    message: "Restaurant updated",
    data: restaurant,
  });
});

export const getAllRestaurant = asyncHandler(async (req, res) => {
  const restaurants = await User.find({ role: "RESTAURANT" }).populate(
    "models.pricePlanID"
  );
  res.status(200).json({
    success: true,
    data: restaurants.reverse(),
  });
});

export const getRestaurantById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const restaurant = await User.findById(id);
  if (!restaurant) {
    return res
      .status(400)
      .json({ success: false, error: "Restaurant not found" });
  }
  res.status(200).json({ success: true, data: restaurant });
});

export const deleteRestaurant = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const restaurant = await User.findByIdAndDelete(id);
  if (!restaurant) {
    return res
      .status(400)
      .json({ success: false, error: "Restaurant not found" });
  }
  res.status(200).json({ success: true, message: "Restaurant deleted" });
});

export const applyForModel = asyncHandler(async (req, res) => {
  const { restaurantID } = req.params;
  const { pricePlanID, count } = req.body;

  const restaurant = await User.findById(restaurantID);
  if (!restaurant) {
    return res
      .status(400)
      .json({ success: false, error: "Restaurant not found" });
  }

  restaurant.models.push({ pricePlanID: pricePlanID, count });
  await restaurant.save();

  res.status(200).json({
    success: true,
    message: "Model applied",
    data: restaurant,
  });
});
