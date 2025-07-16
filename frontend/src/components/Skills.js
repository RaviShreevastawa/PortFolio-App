const skills = {
  Frontend: ["React", "Next.js", "Tailwind"],
  Backend: ["Node.js", "Express", "MongoDB"],
  Others: ["Git", "Docker", "AWS"],
};

const Skills = () => {
  return (
    <section className="p-10">
      <h2 className="text-3xl font-bold mb-6">Skills</h2>
      {Object.entries(skills).map(([category, items]) => (
        <div key={category} className="mb-4">
          <h3 className="text-xl font-semibold mb-2">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {items.map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full cursor-pointer hover:bg-blue-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Skills;