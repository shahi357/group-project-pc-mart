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
  price: {
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
  orderDate: {
    type: Date,
  },
  orderDetails: [orderDetailsSchema],
});

orderSchema.virtual("total").get(function () {
  return this.orderDetails?.reduce((sum, item) => {
    return (sum += (item.price || 0) * (item.quantity || 0));
  }, 0) || 0;
});
orderSchema.set("toJSON", { virtuals: true });
orderSchema.set("toObject", { virtuals: true });

const Order = mongoose.model("orders", orderSchema);
export { Order };
