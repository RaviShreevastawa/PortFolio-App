import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import API from "../api/api";
import { toast } from "react-toastify";

const ManageProjects = () => {
  const { user } = useSelector((state) => state.auth);
  const [projects, setProjects] = useState([]);
  const [editProjectId, setEditProjectId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [newProject, setNewProject] = useState({ 
    title: "", 
    description: "", 
    githubLink : "", 
    liveLink : "", 
    image : null 
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await API.get("/api/v1/projects");
        //console.log(data)
        if (Array.isArray(data.data)) {
          setProjects(data.data);
          //console.log(data)
        } else {
          setProjects([]);  
        }
      } catch (error) {
        toast.error("Failed to fetch projects.");
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setNewProject({ ...newProject, image: file });

      if (file) {
        const preview = URL.createObjectURL(file);
        setPreviewImage(preview);
      }
    } else {
      setNewProject({ ...newProject, [e.target.name]: e.target.value });
    }
  };


  const handleSubmit = async () => {
    if (!newProject.title || !newProject.description) {
      toast.error("Title and description are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newProject.title);
    formData.append("description", newProject.description);
    formData.append("githubLink", newProject.githubLink);
    formData.append("liveLink", newProject.liveLink);
    if (newProject.image instanceof File) {
      formData.append("image", newProject.image);
    }

    try {
      if (editProjectId) {
        // 🔄 Update Mode
        const { data } = await API.put(`/api/v1/projects/${editProjectId}`, formData, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "multipart/form-data"
          }
        });
        console.log(data)

        setProjects(projects.map((p) =>
            p._id === editProjectId
              ? {
                  ...data.data,
                  image: data.data.image ? `http://localhost:4000${data.data.image}` : ""
                }
              : p
          ));

        toast.success("Project updated!");
      } else {
        // ➕ Create Mode
        const { data } = await API.post("/api/v1/projects", formData, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "multipart/form-data"
          }
        });

        setProjects([...projects, data.data]);
        toast.success("Project created!");
      }

      // Clear form after submit
      setNewProject({ title: "", description: "", githubLink: "", liveLink: "", image: null });
      setEditProjectId(null);
      setPreviewImage(null);
    } catch (error) {
      toast.error("Failed to submit project.");
    }
  };



  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/v1/projects/${id}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });

      setProjects(projects.filter((project) => project._id !== id));
      toast.success("Project deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete project.");
    }
  };

  return (
    <div className="space-x-10 p-6  shadow-2xl rounded-lg">
      <div className="bg-transparent rounded-lg h-full mt-0 p-10 grid grid-cols-1 
                    md:grid-cols-2 w-full min-h-screen space-x-10 shadow-2xl">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center">Manage Projects</h2>
          {/* Add New Project */}
          <div className="mb-6">
            <input
              type="text"
              name="title"
              value={newProject.title}
              onChange={handleChange}
              placeholder="Project Title"
              className="w-full px-4 py-2 rounded mb-2"
            />
            <textarea
              name="description"
              value={newProject.description}
              onChange={handleChange}
              placeholder="Project Description"
              className="w-full px-4 p-4 m-4 rounded mb-2"
            />
            <input 
              name="githubLink" 
              value={newProject.githubLink}
              onChange={handleChange} 
              placeholder="GitHub Link" 
              className="w-full p-2 border" 
            />
            <input 
              name="liveLink" 
              value={newProject.liveLink}
              onChange={handleChange} 
              placeholder="Live Link" 
              className="w-full p-2 border" 
            />
            <input
              type="file" 
              name="image" 
              accept="image/*"
              onChange={handleChange} 
              className="w-full p-2 border" 
            />
            <button
              onClick={handleSubmit}
              className="bg-lime-600 text-white p-4 mt-5 rounded-lg hover:bg-blue-700"
            >
              {editProjectId ? "Update Project" : "Add Project"}
            </button>

            {editProjectId && (
              <button
                onClick={() => {
                  setEditProjectId(null);
                  setNewProject({ title: "", description: "", githubLink: "", liveLink: "", image: null });
                  setPreviewImage(null);
                }}
                className="bg-gray-600 text-white p-4 mt-5 rounded-lg hover:bg-gray-700 ml-2"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center">Image Preview</h2>
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-100 h-150 mt-2 rounded"
            />
          )}
        </div>
      </div>
      <div className="bg-transparent p-10 ">
        {/* Project List */}
        <h3 className="text-xl text-center font-semibold p-10">Existing Projects</h3>
        {projects.length > 0 ? (
          <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
            {projects
              .filter((project) => project && project._id)  // Defensive check
              .map((project) => (
                <li key={project._id} className="">
                  <div className="bg-transparent border rounded-lg shadow-md hover:shadow-xl  
                  duration-300v transition duration-300 flex flex-col h-full">
                    <img 
                      src={`http://localhost:4000${project.image}`} 
                      alt={project.title} 
                      className="rounded-t-lg w-full h-80" 
                    />
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <h4 className="text-lg font-semibold text-center text-gray-800 mb-2">{project.title}</h4>
                      <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                      <div className="flex flex-col gap-2 mt-auto">
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                          className="bg-gray-800 text-white text-sm px-3 py-1 rounded hover:bg-gray-700 text-center">
                          GitHub Link
                        </a>
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                          className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-500 text-center">
                          Live Link
                        </a>
                        <button
                          onClick={() => {
                            setEditProjectId(project._id);
                            setNewProject({
                              title: project.title,
                              description: project.description,
                              githubLink: project.githubLink,
                              liveLink: project.liveLink,
                              image: null,
                            });
                            setPreviewImage(`http://localhost:4000${project.image}`);
                          }}
                          className="bg-yellow-500 text-white text-sm px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>

                        <button onClick={() => handleDelete(project._id)}
                                className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>

              ))}
          </ul>
        ) : (
          <p className="text-lime-950">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageProjects;
