import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  return (
    <nav className="bg-blue-600 text-white py-4 px-6 shadow-md flex justify-between items-center">
      <Link to="/" className="text-xl font-bold hover:text-yellow-300">
        Portfolio
      </Link>

      <div className="space-x-4">
        <Link to="/" className="hover:text-yellow-300">Home</Link>
        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-yellow-300">Dashboard</Link>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-700">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-yellow-300">Login</Link>
            <Link to="/register" className="hover:text-yellow-300">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
