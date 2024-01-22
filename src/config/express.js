import express from "express";
import cors from "cors";
import userRouter from "../router/user.router.js";
import productRouter from "../router/product.router.js";
import orderRouter from "../router/order.router.js";
import authRouter from "../router/auth.router.js";

const app = express();
app.use(cors());
app.options("*", cors());

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Application is active."
  });
});

app.use("/api", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

export default app;
