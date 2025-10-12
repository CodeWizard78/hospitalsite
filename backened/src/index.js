// src/index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "../routes/user.route.js"; // Make sure this path is correct
import { DB_NAME } from "./constants.js";

// Load environment variables from .env
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true,
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Routes
app.use("/api/v1/user", router);

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: DB_NAME, // Use your DB name from constants.js
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected successfully at host: ${connection.connection.host}`);

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Stop the server if DB connection fails
  }
};

// Start everything
startServer();

export default app;
