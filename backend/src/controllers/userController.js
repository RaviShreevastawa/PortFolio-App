import path from "path";
import fs from "fs";
import { User } from "../models/userSchema.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/Response.js";
import { ApiError } from "../utils/ApiError.js";
import multer from "multer";

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`);
    },
});
const upload = multer({ storage }).single("profilePic");

// Helper Function: Generate Access & Refresh Tokens
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Error generating tokens.");
    }
};

// Register User
export const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        throw new ApiError(400, "All fields are required.");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(400, "User already exists with this email.");
    }

    const user = await User.create({ fullname, email, password });

    return res.status(201).json(new ApiResponse(201, user, "User registered successfully."));
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required.");
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.isPasswordCorrect(password))) {
        throw new ApiError(400, "Invalid credentials.");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    return res
        .cookie("accessToken", accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production" })
        .cookie("refreshToken", refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production" })
        .json(new ApiResponse(200, { user, accessToken, refreshToken }, "User logged in successfully."));
});

// Logout User
export const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });

    return res
        .cookie("accessToken", "", { httpOnly: true, expires: new Date(0) })
        .cookie("refreshToken", "", { httpOnly: true, expires: new Date(0) })
        .json(new ApiResponse(200, {}, "User logged out successfully."));
});

// Upload Profile Image
export const uploadProfileImage = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            throw new ApiError(500, "File upload failed");
        }
        const user = await User.findById(req.user._id);
        if (!user) {
            throw new ApiError(404, "User not found.");
        }

        // Delete the old profile image if exists
        if (user.profileImage) {
            const oldImagePath = path.join("uploads", user.profileImage);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        user.profileImage = req.file.filename;
        await user.save();

        res.status(200).json(new ApiResponse(200, user, "Profile image updated successfully."));
    });
});

// Get User Profile
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully."));
});
