import mongoose from "mongoose";

const stringObject = { type: String, required: true };
const orderDetailsSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },

  quantity: {
    type: Number,
  },
});

const orderSchema = new mongoose.Schema({
  userName: stringObject,
  userEmail: stringObject,
  city: stringObject,
  postal: stringObject,
  userAddress1: stringObject,
  userAddress2: stringObject,
  userPhone: stringObject,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: false,
  },
  orderedDate: {
    type: Date,
  },
  orderDetails: [orderDetailsSchema],
});

const Order = mongoose.model("orders", orderSchema);
export { Order };
