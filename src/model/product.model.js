import mongoose from "mongoose";
import { appConstants } from "../config/constant.js";
const productSchema = mongoose.Schema({
  productType: {
    type: String,
  },
  productBrand: {
    type: String,
  },
  productWarranty: {
    type: String,
  },
  productColor: {
    type: String,
  },
  productName: {
    type: String,
  },
  productQuantity: {
    type: Number,
  },
  productWeight: {
    type: String,
  },
  productDescription: {
    type: String,
  },
  productPrice: {
    type: Number,
  },
  productDiscount: {
    type: Number,
  },
  image: {
    type: String,
  },
});

productSchema.virtual("imageUri").get(function () {
  console.log(this.image, "image");
  if (this.image) {
    return appConstants.appUrl +"/images/" +this.image;
  }
  return null;
});
productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

const Product = mongoose.model("products", productSchema);
export { Product };
