import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProjectForm = ({ fetchProjects }) => {
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error("All fields are required!");
      return;
    }

    try {
      await axios.post("/api/v1/projects", formData);
      toast.success("Project added successfully!");
      fetchProjects();
      setFormData({ title: "", description: "" });
    } catch (error) {
      toast.error("Failed to add project");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg mb-6">
      <input
        type="text"
        name="title"
        placeholder="Project Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md mb-2"
      />

      <textarea
        name="description"
        placeholder="Project Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md mb-2"
      ></textarea>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Project
      </button>
    </form>
  );
};

export default ProjectForm;
