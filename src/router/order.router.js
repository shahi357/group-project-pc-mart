import express from "express";
import {
  addNewOrder,
  deleteOrder,
  getAllOrder,
  getOrderById,
} from "../controller/order.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { admin } from "../middleware/admin.middleware.js";
import { validateRequest } from "../config/request-validator.js";
import { addOrderSchema } from "../validation/order.schema.js";
const router = express.Router();
/**customer routes */
router.post("/", validateRequest(addOrderSchema), addNewOrder);

/** admin routes */
router.get("/", auth, admin, getAllOrder);
router.get("/:id", auth, admin, getOrderById);
router.delete("/:id", auth, admin, deleteOrder);

export default router;
