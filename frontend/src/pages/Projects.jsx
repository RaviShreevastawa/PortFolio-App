import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import axios from "axios";
import API from '../api/api'
import { toast } from "react-toastify";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await API.get("/api/v1/projects");
        setProjects(data.projects);
      } catch (error) {
        toast.error("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!projects?.length) return <p className="text-center mt-10 text-gray-500">No projects available.</p>;
  console.log(projects)

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Projects</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link to={`/projects/${project._id}`} key={project._id} className="group bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition">
            {project.image && (
              <img src={project.image} alt="Project" className="w-full h-40 object-cover group-hover:scale-105 transition" />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-gray-600 line-clamp-2">{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
