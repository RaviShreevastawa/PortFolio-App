import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    uploadProfileImage,
    getUserProfile
} from "../controllers/userController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });

const router = express.Router();

// Authentication Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authenticateUser, logoutUser);

// User Profile Routes
router.get("/profile", authenticateUser, getUserProfile);

// Ensure authentication runs before multer middleware
router.post("/upload-profile", authenticateUser, upload.single("profileImage"), uploadProfileImage);

export default router;
