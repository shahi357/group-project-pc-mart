import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const mongooseURl = process.env.MONGO_URL;
    mongoose
      .connect(mongooseURl, {})
      .then(() => console.log("Database Connected"));
  } catch (error) {
    console.log("Error connecting db", error);
  }
};
