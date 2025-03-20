import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const ManageProjects = () => {
  const { user } = useSelector((state) => state.auth);
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("/api/v1/projects");
        setProjects(data.projects);
      } catch (error) {
        toast.error("Failed to fetch projects.");
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    if (!newProject.title || !newProject.description) {
      toast.error("Title and description are required.");
      return;
    }

    try {
      const { data } = await axios.post("/api/v1/projects", newProject, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });

      setProjects([...projects, data.project]);
      toast.success("Project created successfully!");
      setNewProject({ title: "", description: "" });
    } catch (error) {
      toast.error("Failed to create project.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/projects/${id}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });

      setProjects(projects.filter((project) => project._id !== id));
      toast.success("Project deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete project.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Projects</h2>

      {/* Add New Project */}
      <div className="mb-6">
        <input
          type="text"
          name="title"
          value={newProject.title}
          onChange={handleChange}
          placeholder="Project Title"
          className="w-full px-4 py-2 border rounded mb-2"
        />
        <textarea
          name="description"
          value={newProject.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="w-full px-4 py-2 border rounded mb-2"
        />
        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Project
        </button>
      </div>

      <hr className="my-6" />

      {/* Project List */}
      <h3 className="text-xl font-semibold mb-4">Existing Projects</h3>
      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project._id} className="flex justify-between items-center border-b py-2">
              <div>
                <h4 className="text-lg font-semibold">{project.title}</h4>
                <p className="text-gray-600">{project.description}</p>
              </div>
              <button
                onClick={() => handleDelete(project._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No projects found.</p>
      )}
    </div>
  );
};

export default ManageProjects;
