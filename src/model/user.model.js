import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { appConstants } from "../config/constant.js";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  userPassword: {
    type: String,
    select:false
  },
  userImage: {
    type: String,
  },
  city: {
    type: String,
  },
  postal: {
    type: String,
  },
  userAddress1: {
    type: String,
  },
  userAddress2: {
    type: String,
  },
  userPhone: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default:false
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
        select:false
      },
    },
    
  ],
});

userSchema.statics.checkCredentialsDb = async (user, pass) => {
  try {
    return await User.findOne({ userEmail: user, userPassword: pass });
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("users", userSchema);
export { User };
