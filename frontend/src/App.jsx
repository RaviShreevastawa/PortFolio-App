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

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/projects/manage" element={<ManageProjects/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
