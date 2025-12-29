import { Router } from "express";
import { authGuard } from "../middleware/auth.middleware.js";
import {
  createRestaurant,
  getAllRestaurant,
  loginRestaurant,
  getRestaurantById,
  deleteRestaurant,
} from "../controller/restaurant.controller.js";

const restRouter = Router();

restRouter.post("/create-restaurant", createRestaurant);
restRouter.post("/login-restaurant", loginRestaurant);
restRouter.get(
  "/get-all-restaurant",
  // authGuard(["ADMIN"]),
  getAllRestaurant
);
restRouter.get(
  "/get-restaurant/:id",
  // authGuard(["ADMIN"]),
  getRestaurantById
);
restRouter.delete(
  "/delete-restaurant/:id",
  // authGuard(["ADMIN"]),
  deleteRestaurant
);
export default restRouter;
