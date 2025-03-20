import express from "express";
import {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
} from "../controllers/projectController.js";
import { authenticateUser, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes (Users can read projects)
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

// Admin-Only Routes (CRUD operations)
router.post("/", authenticateUser, authorizeRoles("admin"), createProject);
router.put("/:id", authenticateUser, authorizeRoles("admin"), updateProject);
router.delete("/:id", authenticateUser, authorizeRoles("admin"), deleteProject);

export default router;
