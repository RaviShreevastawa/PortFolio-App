import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import axios from "axios";
import API from '../api/api'
import { toast } from "react-toastify";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await API.get(`/api/v1/projects/${id}`);
        setProject(data.project);
      } catch (error) {
        toast.error("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!project) return <p className="text-center mt-10 text-red-500">Project not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
      {project.image && <img src={project.image} alt="Project" className="w-full h-64 object-cover rounded mb-4" />}
      <p className="text-gray-700">{project.description}</p>
    </div>
  );
};

export default ProjectDetails;
