import { Router } from "express";
import { uploadGLTF } from "../middleware/upload.middleware.js";
import {
  uploadModel,
  deleteModel,
  getModel,
  updateModel,
  getSingleModel,
} from "../controller/model.controller.js";

const modelRoute = Router();

modelRoute.post("/", uploadGLTF.single("model"), uploadModel);
modelRoute.get("/", getModel);
modelRoute.post("/:id", getSingleModel);
modelRoute.post("/:id", updateModel);
modelRoute.post("/:id", deleteModel);

export default modelRoute;
