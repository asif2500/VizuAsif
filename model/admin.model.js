import { Schema, model } from "mongoose";

const adminSchema = new Schema(
  {
    name: String,
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "RESTAURANT"],
      required: true,
    },
  },
  { timestamps: true }
);

export default model("admin", adminSchema);
