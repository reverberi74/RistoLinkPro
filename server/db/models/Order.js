const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const OrderItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  status: {
    type: String,
    enum: ["preparing", "served"],
    default: "preparing",
  },
});

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    taxes: { type: Number, required: true },
    service: { type: Number, required: true },
    tip: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paid: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "paid", "completed"],
      default: "active"
    },
    tableNumber: {
      type: Number,
      required: false
    }
  },
  {
    strict: true,
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Order", OrderSchema);
