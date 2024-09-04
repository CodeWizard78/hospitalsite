import jwt from "jsonwebtoken";
import { User } from "../models/common/user.models.js";

export const verifyJWT = async (req, res, next) => {
    try {
        
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        console.log("Token received:", token);

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request" });
        }

       
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

   
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");

        if (!user) {
            return res.status(401).json({ message: "Invalid Access Token" });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error("Error in verifyJWT:", error); 
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Access token expired" });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid access token" });
        }
        return res.status(401).json({ message: "Unauthorized" });
    }
};
