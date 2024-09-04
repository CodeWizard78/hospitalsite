import express from "express";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "../routes/user.route.js";

import { DB_NAME as IMPORTED_DB_NAME } from "./constants.js";

const app = express();

dotenv.config({ path: './config/.env' });



app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
 
}));
 
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());


app.use("/api/v1/user", router);

const databaseConnection = async () => {
   try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${IMPORTED_DB_NAME}`);
    console.log(`MongoDB connected successfully. DB_HOST: ${connectionInstance.connection.host}`);

    app.listen(process.env.PORT, () => {
      console.log(`App Listening on port ${process.env.PORT}`);
    });
      
   } catch(error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
   }
};

databaseConnection();

export default app;