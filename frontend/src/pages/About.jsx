import GitHubCalendar from "react-github-calendar";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      <p className="mb-4">
        I'm a passionate Full Stack Developer driven by creativity and innovation. I love building apps that are fast, 
        beautiful, and solve real problems. I've spoken at dev events, built AI tools, and mentored junior developers.
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>Tech hobbies: Hackathons, GitHub automation, FOSS</li>
        <li>Speaker at local tech meetups</li>
        <li>Building GenAI-powered tools</li>
      </ul>
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-2">GitHub Contributions</h3>
        <GitHubCalendar username="RaviShreevastawa" />
      </div>
    </div>
  );
}