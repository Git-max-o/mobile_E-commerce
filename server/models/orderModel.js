import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    items: [orderItemSchema],

    totalAmount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
    },

    // ✅ নতুন ফিচার ১: শিপিং অ্যাড্রেস
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: String, required: true },
      phone: { type: String, required: true },
    },

    // ✅ নতুন ফিচার ২: পেমেন্ট মেথড
    paymentMethod: {
      type: String,
      enum: ["bKash", "Nagad", "Rocket", "Card", "CashOnDelivery"],
      required: true,
    },

    // ✅ নতুন ফিচার ৩: ডেলিভারি সময়
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
