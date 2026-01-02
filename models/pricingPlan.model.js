import { Schema, model } from "mongoose";

const PricingPlanSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    monthlyFee: {
      type: Number,
      required: true,
    },

    perModel: {
      type: Number,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default model("PricingPlan", PricingPlanSchema);
