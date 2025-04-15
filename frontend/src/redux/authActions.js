import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api.js";

// ✅ Update User Profile
export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await API.put("/api/v1/users/profile", userData);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Profile update failed");
    }
  }
);

// ✅ Add Project (Admin Only)
export const addProject = createAsyncThunk(
  "auth/addProject",
  async (projectData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/api/v1/projects", projectData);
      return data.project;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add project");
    }
  }
);

// ✅ Get All Projects
export const fetchProjects = createAsyncThunk(
  "auth/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/api/v1/projects");
      return data.projects;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch projects");
    }
  }
);

// ✅ Delete Project (Admin Only)
export const deleteProject = createAsyncThunk(
  "auth/deleteProject",
  async (projectId, { rejectWithValue }) => {
    try {
      await API.delete(`/api/v1/projects/${projectId}`);
      return projectId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete project");
    }
  }
);
