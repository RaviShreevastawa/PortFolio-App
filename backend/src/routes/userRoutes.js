import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    uploadProfileImage,
    getUserProfile
} from "../controllers/userController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Authentication Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authenticateUser, logoutUser);

// User Profile Routes
router.get("/profile", authenticateUser, getUserProfile);
router.post("/upload-profile", authenticateUser, upload.single("profileImage"), uploadProfileImage);

export default router;
