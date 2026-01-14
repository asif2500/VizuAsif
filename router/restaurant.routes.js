import { Router } from "express";
import { authGuard } from "../middleware/auth.middleware.js";
import {
  applyForModel,
  loginRestaurant,
  createRestaurant,
  getAllRestaurant,
  deleteRestaurant,
  getRestaurantById,
  updateRestaurantById,

  // model
  getModelFile,
  uploadModelFile,
  deleteModelFile,
  toggleModelActive,
} from "../controller/restaurant.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const restRouter = Router();

restRouter.post("/login-restaurant", loginRestaurant);
restRouter.post("/create-restaurant", createRestaurant);
restRouter.get("/get-all-restaurant", getAllRestaurant);
restRouter.get("/get-restaurant/:id", getRestaurantById);
restRouter.delete("/delete-restaurant/:id", deleteRestaurant);
restRouter.put("/update-restaurant/:id", updateRestaurantById);

restRouter.post("/apply-for-model/:restaurantID", applyForModel);

restRouter.post(
  "/save-3d-model-file/:restaurantID",
  upload.fields([{ name: "glb" }, { name: "usdz" }, { name: "thumbnail" }]),
  uploadModelFile
);
restRouter.get("/get-model-file/:restaurantID", getModelFile);
restRouter.delete("/delete-model-file/:restaurantID", deleteModelFile);
restRouter.put("/toggle-model-active/:restaurantID/:modelID", toggleModelActive);
export default restRouter;
