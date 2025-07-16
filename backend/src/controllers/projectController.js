import { Project } from "../models/projectSchema.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/Response.js";
import { ApiError } from "../utils/ApiError.js";

// Create Project (Admin only)
export const createProject = asyncHandler(async (req, res) => {
  const { title, description, liveLink, githubLink } = req.body;

  if (!title || !description) {
    throw new ApiError(400, "Title and description are required.");
  }

  // ✅ Fix: get image path from uploaded file
  const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

  const project = await Project.create({
    title,
    description,
    image: imagePath, // ✅ correctly save image URL to DB
    liveLink,
    githubLink,
    createdBy: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, project, "Project created successfully."));
});


// Get All Projects (Public)
export const getAllProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find();
    return res.status(200).json(new ApiResponse(200, projects, "Projects fetched successfully."));
});

// Get Single Project (Public)
export const getProjectById = asyncHandler(async (req, res) => {
    const projects = await Project.findById(req.params.id);

    if (!projects) {
        throw new ApiError(404, "Project not found.");
    }

    return res.status(200).json(new ApiResponse(200, projects, "Project fetched successfully."));
});

// Update Project (Admin only)
export const updateProject = asyncHandler(async (req, res) => {
    const { title, description, image, liveLink, githubLink } = req.body;

    let project = await Project.findById(req.params.id);

    if (!project) {
        throw new ApiError(404, "Project not found.");
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.image = image || project.image;
    project.liveLink = liveLink || project.liveLink;
    project.githubLink = githubLink || project.githubLink;

    await project.save();

    return res.status(200).json(new ApiResponse(200, project, "Project updated successfully."));
});

// Delete Project (Admin only)
export const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        throw new ApiError(404, "Project not found.");
    }

    await project.deleteOne();

    return res.status(200).json(new ApiResponse(200, {}, "Project deleted successfully."));
});
