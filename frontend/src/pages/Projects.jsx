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
        //console.log(data)
        setProjects(data.data);
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
  

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Projects</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {projects.map((project) => (
          <div
            key={project._id}
            className="group bg-transparent rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col"
          >
            {/* Project Card Link */}
            <Link
              to={`/projects/${project._id}`}
              className="block"
            >
              <img
                src={`http://localhost:4000${project.image}`}
                alt={project.title}
                className="w-full h-80 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
              </div>
            </Link>

            {/* External Buttons */}
            <div className="flex flex-col gap-2 px-4 pb-4 mt-auto">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white text-sm px-3 py-1 rounded hover:bg-gray-700 text-center"
                >
                  GitHub Link
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-500 text-center"
                >
                  Live Link
                </a>
              )}
            </div>
          </div>

        ))}
      </div>
    </div>

  );
};

export default Projects;
