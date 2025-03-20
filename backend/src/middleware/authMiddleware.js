import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// Authenticate User
export const authenticateUser = asyncHandler(async (req, res, next) => {
    const token = req.cookies.accessToken; // Get token from cookies

    if (!token) {
        throw new ApiError(401, "Not authorized. No token found.");
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = await User.findById(decoded._id).select("-password -refreshToken");
        next();
    } catch (error) {
        throw new ApiError(403, "Token expired or invalid. Please log in again.");
    }
});

// Authorize Roles (Admin Only or Specific Roles)
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new ApiError(403, "Access forbidden. Insufficient permissions.");
        }
        next();
    };
};
