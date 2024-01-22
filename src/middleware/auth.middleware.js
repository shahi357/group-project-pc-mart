import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { appConstants } from "../config/constant.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        message: "Missing token. Authorization header is required.",
      });
    }

    const decoded = jwt.verify(token, appConstants.jwtSecret);
    console.log(decoded, "decoded",token);

    const user = await User.findOne({
      _id: decoded._id
    });

    if (!user) {
      res.status(401).json({
        message: "Unauthenticated!",
      });
      return;
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ error: "Authentication failed." });
  }
};
