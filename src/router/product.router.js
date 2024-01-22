import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} from "../controller/product.controller.js";
import { uploadImage } from "../services/multer.js";
import { validateRequest } from "../config/request-validator.js";
import { addProductSchema } from "../validation/product.schema.js";
import { admin } from "../middleware/admin.middleware.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post(
  "/",
  uploadImage.single("image"),
  validateRequest(addProductSchema),
  addProduct
);
router.get("/:id", getProductById);
router.delete("/:id", auth, admin, deleteProduct);

export default router;
