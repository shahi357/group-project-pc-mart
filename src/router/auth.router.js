import express from "express";
import {
  login,
  upload,
  userRegistration,
} from "../controller/auth.controller.js";
import { validateRequest } from "../config/request-validator.js";
import {
  loginSchema,
  userRegistrationSchema,
} from "../validation/user.schema.js";
import { auth } from "../middleware/auth.middleware.js";
import { getMe, logout, logoutAll } from "../controller/user.controller.js";

const router = express.Router();

router.post(
  "/register",
  upload.single("imageFile"),
  validateRequest(userRegistrationSchema),
  userRegistration
);
router.post("/login", validateRequest(loginSchema), login);
router.get("/me", auth, getMe);
router.post("/logout", auth, logout);
router.post("/logoutAll", auth, logoutAll);

export default router;
