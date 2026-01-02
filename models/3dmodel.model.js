import { Schema, model } from "mongoose";

const modelSchema = new Schema({
  title: String,
  description: String,
  models: {
    glb: String,
    usdz: String,
    png: String,
  },
});

export default model("Model3D", modelSchema);
