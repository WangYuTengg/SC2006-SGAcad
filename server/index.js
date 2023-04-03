/**
 * @fileoverview This is the main file for the server-side code of the StudySpotFinder app.
 * It sets up the Express app and MongoDB database, and configures the app with middleware
 * and routes.
 * @version 1.0.0
 */

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import studySpotRoutes from "./routes/studyspots.js";

/* CONFIGURATIONS */

// Set __filename and __dirname for use with static file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* ROUTES */

// Authentication routes
app.use("/auth", authRoutes);

// User routes
app.use("/users", userRoutes);

// Study spot routes
app.use("/studyspots", studySpotRoutes);

/* MONGOOSE SETUP */

// Set the port for the app to listen on
const PORT = process.env.PORT || 6001;

// Connect to the MongoDB database using Mongoose
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Start the app on the specified port
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
