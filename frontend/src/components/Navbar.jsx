import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const { user, admin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        <Link to="/" className="text-xl font-bold">PortFolio App</Link>

        <div className="flex gap-4 items-center">
          {user && (
            <>
              {!admin && (
                <>
                  <Link to="/hero">Hero</Link>
                  <Link to="/about">About</Link>
                  <Link to="/projects">Projects</Link>
                  <Link to="/experience">Experience</Link>
                  <Link to="/skills">Skills</Link>
                  <Link to="/education">Education</Link>
                  <Link to="/certifications">Certifications</Link>
                  <Link to="/blog">Blog</Link>
                  <Link to="/contact">Contact</Link>
                </>
              )}
              {admin && (
                <>
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/profile">Profile</Link>
                  <Link to="/projects">Projects</Link>
                  <Link to="/projects/manage">Manage Projects</Link>
                </>
              )}
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
            </>
          )}
          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
