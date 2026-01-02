import { Router } from "express";
import { authGuard } from "../middleware/auth.middleware.js";
import {
  createRestaurant,
  getAllRestaurant,
  loginRestaurant,
  getRestaurantById,
  deleteRestaurant,
  updateRestaurant,
  applyForModel,
} from "../controller/restaurant.controller.js";

const restRouter = Router();

restRouter.post("/create-restaurant", createRestaurant);
restRouter.post("/login-restaurant", loginRestaurant);
restRouter.put("/update-restaurant/:id", updateRestaurant);
restRouter.get("/get-all-restaurant", getAllRestaurant);
restRouter.get("/get-restaurant/:id", getRestaurantById);
restRouter.delete("/delete-restaurant/:id", deleteRestaurant);

restRouter.post("/apply-for-model/:restaurantID", applyForModel);
export default restRouter;
