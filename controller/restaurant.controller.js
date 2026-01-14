import asyncHandler from "express-async-handler";
import { hash, compare } from "bcryptjs";
import restaurant from "../models/restaurant.model.js";

export const createRestaurant = asyncHandler(async (req, res) => {
  const { phone, password, name } = req.body;

  if (!phone || !password || !name) {
    return res.status(400).json({ success: false, error: "Missing fields" });
  }

  const nameExists = await restaurant.findOne({ name });
  const phoneExists = await restaurant.findOne({ phone });
  if (nameExists || phoneExists) {
    return res
      .status(400)
      .json({ success: false, error: "Restaurant already exists" });
  }

  const hashedPassword = await hash(password, 10);

  const restaurantData = await restaurant.create({
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
    data: restaurantData,
  });
});

export const loginRestaurant = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ success: false, error: "Missing fields" });
  }

  const restaurantData = await restaurant.findOne({ phone });
  if (!restaurantData) {
    return res
      .status(400)
      .json({ success: false, error: "Restaurant not found" });
  }

  const isMatch = await compare(password, restaurantData.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid credentials" });
  }

  res.status(200).json({
    message: "Restaurant logged in",
    restaurantId: restaurantData._id,
  });
});

export const updateRestaurantById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, phone, password } = req.body;

  const restaurantData = await restaurant.findById(id);
  if (!restaurantData) {
    return res
      .status(400)
      .json({ success: false, error: "Restaurant not found" });
  }

  if (name) {
    restaurantData.name = name;
  }
  if (phone) {
    restaurantData.phone = phone;
  }
  if (password) {
    const hashedPassword = await hash(password, 10);
    restaurantData.password = hashedPassword;
  }

  await restaurantData.save();

  res.status(200).json({
    success: true,
    message: "Restaurant updated",
    data: restaurantData,
  });
});

export const getAllRestaurant = asyncHandler(async (req, res) => {
  const restaurantsData = await restaurant.find({ role: "RESTAURANT" }).populate(
    "models.pricePlanID"
  );
  res.status(200).json({
    success: true,
    data: restaurantsData.reverse(),
  });
});

export const getRestaurantById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const restaurantData = await restaurant.findById(id);
  if (!restaurantData) {
    return res
      .status(400)
      .json({ success: false, error: "Restaurant not found" });
  }
  res.status(200).json({ success: true, data: restaurantData });
});

export const deleteRestaurant = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const restaurantData = await restaurant.findByIdAndDelete(id);
  if (!restaurantData) {
    return res
      .status(400)
      .json({ success: false, error: "Restaurant not found" });
  }
  res.status(200).json({ success: true, message: "Restaurant deleted" });
});

export const applyForModel = asyncHandler(async (req, res) => {
  const { restaurantID } = req.params;
  const { pricePlanID, count } = req.body;

  const restaurantData = await restaurant.findById(restaurantID);
  if (!restaurantData) {
    return res
      .status(400)
      .json({ success: false, error: "Restaurant not found" });
  }

  restaurantData.models.push({ pricePlanID: pricePlanID, count });
  await restaurantData.save();

  res.status(200).json({
    success: true,
    message: "Model applied",
    data: restaurantData,
  });
});

export const uploadModelFile = asyncHandler(async (req, res) => {
  const { restaurantID } = req.params;
  const { title } = req.body;
  const { glb, usdz, thumbnail } = req.files;

  const restaurantData = await restaurant.findById(restaurantID);
  if (!restaurantData) {
    return res
      .status(404)
      .json({ success: false, error: "Restaurant not found" });
  }

  if (!glb || !usdz || !thumbnail) {
    return res.status(400).json({
      success: false,
      error: "All 3 files (glb, usdz, thumbnail) are required",
    });
  }

  const modelData = {
    title,
    glb: glb[0].path,
    usdz: usdz[0].path,
    thumbnail: thumbnail[0].path,
    createdAt: new Date(),
  };

  restaurantData.threeDModels.push(modelData);
  await restaurantData.save();

  res.status(201).json({
    success: true,
    message: "3D model uploaded successfully",
    model: modelData,
  });
});

export const getModelFile = asyncHandler(async (req, res) => {
  const { restaurantID } = req.params;
  const restaurantData = await restaurant.findById(restaurantID);
  if (!restaurantData) {
    return res
      .status(404)
      .json({ success: false, error: "Restaurant not found" });
  }
  res.status(200).json({ success: true, data: restaurantData.threeDModels });
});

export const deleteModelFile = asyncHandler(async (req, res) => {
  const { restaurantID } = req.params;
  const restaurantData = await restaurant.findById(restaurantID);
  if (!restaurantData) {
    return res
      .status(404)
      .json({ success: false, error: "Restaurant not found" });
  }
  restaurantData.threeDModels = restaurantData.threeDModels.filter(
    (model) => model._id.toString() !== id
  );
  await restaurantData.save();
  res.status(200).json({ success: true, message: "Model deleted" });
});

export const toggleModelActive = asyncHandler(async (req, res) => {
  const { restaurantID, modelID } = req.params;
  const { isActive } = req.body;
  const restaurantData = await restaurant.findById(restaurantID);
  if (!restaurantData) {
    return res.status(404).json({ success: false, error: "Restaurant not found" });
  }
  restaurantData.threeDModels.find(model => model._id.toString() === modelID).isActive = isActive;
  await restaurantData.save();
  res.status(200).json({ success: true, message: "Model activated" });
});
