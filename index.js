import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRouter from "./Routes/Auth.js";
import designRouter from "./Routes/Designs.js";

const app = express();

// Middleware
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ extended: true, limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(morgan("common"));

// Routes
app.use("/user", userRouter);
app.use("/design", designRouter);

// Connecting to Database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(5001, () => {
      console.log(`Server running on port 5001 🔥`);
      console.log("Database Connected Successfully ");
    });
  })
  .catch((err) => console.log(err));
