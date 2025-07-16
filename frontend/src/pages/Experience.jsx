const Experience = () => {
  const experiences = [
    {
      role: "Full Stack Intern",
      company: "Next24Tech Private Limited",
      period: "june 2024 - august 2024",
      points: [
        "Built internal tools using MERN stack",
        "Reduced API latency by 30% using optimized MongoDB queries",
        "Wrote unit tests with Cypress"
      ],
    },
    {
      role: "Machine Learning Intern",
      company: "CodeSoft Private Limited",
      period: "june 2024 - august 2024",
      points: [
        "Built internal tools using MERN stack",
        "Reduced API latency by 30% using optimized MongoDB queries",
        "Wrote unit tests with Cypress"
      ],
    },
    {
      role: "Python Developer Intern",
      company: "Mainflow Private Limited",
      period: "june 2024 - august 2024",
      points: [
        "Built internal tools using MERN stack",
        "Reduced API latency by 30% using optimized MongoDB queries",
        "Wrote unit tests with Cypress"
      ],
    },
  ];
  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">💼 Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <div className="flex bg-transparent hover:shadow-2xl p-4 shadow rounded-lg justify-between">
            <div key={idx} className="">
              <h3 className="text-xl font-semibold">{exp.role} @ {exp.company}</h3>
              <p className="text-sm text-black mb-2">{exp.period}</p>
              <ul className="list-disc ml-5 text-sm text-white">
                {exp.points.map((point, i) => <li key={i}>{point}</li>)}
              </ul>
            </div>
            <div className="bg-teal-600 m-4 p-2 rounded-lg text-center">
              <button>
                View CertiFicate
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;