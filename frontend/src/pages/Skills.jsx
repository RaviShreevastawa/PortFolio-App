export default function Skills() {
  const frontend = ["React", "Next.js", "TailwindCSS"];
  const backend = ["Node.js", "Express", "MongoDB"];
  const others = ["Git", "Docker", "AWS"];
  const softSkills = ["Communication", "Team Leadership"];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Skills</h2>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold">Frontend</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {frontend.map(skill => <span key={skill} className="px-3 py-1 rounded-full bg-blue-200 text-blue-900 cursor-pointer">{skill}</span>)}
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold">Backend</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {backend.map(skill => <span key={skill} className="px-3 py-1 rounded-full bg-green-200 text-green-900 cursor-pointer">{skill}</span>)}
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold">Others</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {others.map(skill => <span key={skill} className="px-3 py-1 rounded-full bg-purple-200 text-purple-900 cursor-pointer">{skill}</span>)}
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold">Soft Skills</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {softSkills.map(skill => <span key={skill} className="px-3 py-1 rounded-full bg-gray-200 text-gray-900 cursor-pointer">{skill}</span>)}
        </div>
      </section>
    </div>
  );
}
