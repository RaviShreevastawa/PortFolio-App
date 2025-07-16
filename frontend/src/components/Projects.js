const Projects = ({ projects }) => {
  return (
    <section className="p-10">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img src={project.image} alt="" className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-xl mb-1">{project.title}</h3>
              <p className="text-gray-600 mb-2 line-clamp-2">{project.description}</p>
              <div className="flex gap-2 flex-wrap mb-2">
                {project.stack.map((tech) => (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between text-sm">
                <a href={project.github} target="_blank" className="text-blue-500">
                  GitHub
                </a>
                <a href={project.live} target="_blank" className="text-green-500">
                  Live
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;