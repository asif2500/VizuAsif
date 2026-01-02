import { Schema, Types, model } from "mongoose";

const paymentSchema = new Schema(
  {
    // 🔗 Relations
    restaurant: {
      type: Types.ObjectId,
      ref: "restaurant",
      required: true,
    },

    pricingPlan: {
      type: Types.ObjectId,
      ref: "PricingPlan",
      required: true,
    },

    modelID: {
      type: Types.ObjectId,
      ref: "",
      required: true,
    },

    // 💳 Payment details
    paymentMethod: {
      type: String,
      enum: ["bank", "cash", "cheque"],
      required: true,
    },

    transactionId: {
      type: String, // bank transfer only
    },

    chequeNumber: {
      type: String, // cheque only
    },

    // ✅ Status
    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: {
      type: Date,
    },

    // markedBy: {
    //   type: Types.ObjectId,
    //   ref: "restaurant", // ADMIN user
    // },
  },
  { timestamps: true }
);

export default model("Payment", paymentSchema);
