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

  // odel
  uploadModelFile,
  getModelFile,
  deleteModelFile,
} from "../controller/restaurant.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const restRouter = Router();

restRouter.post("/create-restaurant", createRestaurant);
restRouter.post("/login-restaurant", loginRestaurant);
restRouter.put("/update-restaurant/:id", updateRestaurant);
restRouter.get("/get-all-restaurant", getAllRestaurant);
restRouter.get("/get-restaurant/:id", getRestaurantById);
restRouter.delete("/delete-restaurant/:id", deleteRestaurant);

restRouter.post("/apply-for-model/:restaurantID", applyForModel);

restRouter.post(
  "/save-3d-model-file/:restaurantID",
  upload.single("model"),
  uploadModelFile
);
restRouter.get("/get-model-file/:restaurantID", getModelFile);
restRouter.delete("/delete-model-file/:restaurantID", deleteModelFile);
export default restRouter;
