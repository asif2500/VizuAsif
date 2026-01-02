import { Schema, model } from "mongoose";

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
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
      enum: ["RESTAURANT", "ADMIN"],
      default: "RESTAURANT",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    subscriptionStatus: {
      type: String,
      default: "inactive",
    },
    models: [
      {
        count: {
          type: Number,
          default: 0,
        },
        pricePlanID: {
          type: Schema.Types.ObjectId,
          ref: "PricingPlan",
        },
        isActive: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

export default model("restaurant", restaurantSchema);
