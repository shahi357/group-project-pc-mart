import express from "express";
import {
  getAllUsers,
  getMe,
  getUserById,
  logout,
  logoutAll,
  updateUser,
} from "../controller/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/:id", getUserById);
router.get("/", getAllUsers);
router.put("/:id", updateUser);



export default router;
