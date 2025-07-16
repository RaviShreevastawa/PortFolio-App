import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import ManageProjects from "./pages/ManageProjects";
import Projects from './pages/Projects';

import Hero from "./pages/Hero";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Certifications from "./pages/Certifications";

const App = () => {
  const { user, admin } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      <main className=" w-full min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

          {/* Common route for all authenticated users */}
          <Route path="/hero" element={user ? <Hero /> : <Navigate to="/login" />} />
          <Route path="/projects" element={user ? <Projects /> : <Navigate to="/login" />} />
          <Route path="/about" element={user ? <About /> : <Navigate to="/login" />} />
          <Route path="/skills" element={user ? <Skills /> : <Navigate to="/login" />} />
          <Route path="/experience" element={user ? <Experience /> : <Navigate to="/login" />} />
          <Route path="/education" element={user ? <Education /> : <Navigate to="/login" />} />
          <Route path="/certifications" element={user ? <Certifications/> : <Navigate to="/login" />} />
          <Route path="/blog" element={user ? <Blog /> : <Navigate to="/login" />} />
          <Route path="/contact" element={user ? <Contact /> : <Navigate to="/login" />} />


          {/* Admin-only routes */}
          <Route
            path="/dashboard"
            element={admin ? <Dashboard /> : <Navigate to="/projects" />}
          />
          <Route
            path="/profile"
            element={admin ? <Profile /> : <Navigate to="/projects" />}
          />
          <Route
            path="/projects/manage"
            element={admin ? <ManageProjects /> : <Navigate to="/projects" />}
          />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
