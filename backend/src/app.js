import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// CORS Configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Import Routes
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js"; // Changed from postRoutes to projectRoutes

// Route Declarations
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/projects', projectRoutes); // Changed from /posts to /projects

export default app;
