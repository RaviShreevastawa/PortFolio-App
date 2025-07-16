import { Link } from "react-router-dom";
import  Button  from "../components/ui/Button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8">
      <motion.h1 className="text-5xl font-bold mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Ravi Shrivastava
      </motion.h1>
      <p className="text-xl mb-4 text-center">Building seamless digital products with React, Node & AI.</p>
      <div className="flex flex-wrap gap-4 mb-6">
        <Button asChild className="bg-lime-600 text-black hover:bg-lime-700">
          <a href="/resume.pdf" download>Download Resume</a>
        </Button>
        <Button asChild variant="outline">
          <Link to="/contact">Contact Me</Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <Link to="/about" className="hover:underline">About Me</Link>
        <Link to="/skills" className="hover:underline">Skills</Link>
        <Link to="/projects" className="hover:underline">Projects</Link>
        <Link to="/experience" className="hover:underline">Experience</Link>
      </div>
    </div>
  );
}