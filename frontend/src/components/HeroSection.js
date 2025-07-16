import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="text-center p-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <img
        src="/avatar.png"
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <h1 className="text-4xl font-bold">Ravi Shrivastawa</h1>
      <p className="text-xl mt-2">Full-Stack Developer & AI Engineer</p>
      <p className="mt-4">Building seamless digital products with React, Node & AI.</p>
      <div className="mt-6 flex justify-center gap-4">
        <Button asChild>
          <Link to="/contact">Contact Me</Link>
        </Button>
        <Button variant="outline" asChild>
          <a href="/resume.pdf" download>
            Download Resume
          </a>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;