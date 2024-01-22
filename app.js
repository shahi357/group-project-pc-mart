import * as dotenv from "dotenv";
import express from "express";
dotenv.config();
import { createServer } from "node:http";
import { connectDB } from "./src/config/mongoose.js";
import app from "./src/config/express.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

/***PORT SETUP**/
app.set("PORT", process.env.PORT || 3005);

const server = createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagePath = path.join(__dirname, 'images');
app.use('/images', express.static(imagePath));

app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not available!",
  });
});
const startServer = async () => {
  await connectDB();
  server
    .listen(app.get("PORT"), () => {
      console.info(`Application running in port ${app.get("PORT")}`);
    })
    .on("error", (err) => {
      console.error(err, "APP_ERROR");
    });
};

startServer();
const unexpectedErrorHandler = (error) => {
  console.error(
    error,
    "UNHANDLED REJECTION occurred but server was not initialized:"
  );
  process.exit(1);
};

process.on("unhandledRejection", (error) => unexpectedErrorHandler(error));
