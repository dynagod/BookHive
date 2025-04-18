import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyToken = asyncHandler(async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
    
        if (!token) throw new ApiError(401, "Unauthorized request");
    
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        const user = await User.findById(decodedToken?._id).select("-password");
        
        if (!user) throw new ApiError(401, "Invalid access token");
        
        req.user = user;
            
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});