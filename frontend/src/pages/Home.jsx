import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
      <div className="text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Welcome to My Portfolio
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Showcasing innovative projects and creativity. Explore and get inspired!
        </p>

        <div className="flex justify-center space-x-4">
          {user ? (
            <Link to="/dashboard" className="bg-green-500 px-6 py-3 text-lg rounded-lg hover:bg-green-700 transition">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="bg-white text-blue-600 px-6 py-3 text-lg rounded-lg hover:bg-gray-200 transition">
                Login
              </Link>
              <Link to="/register" className="bg-yellow-400 px-6 py-3 text-lg rounded-lg hover:bg-yellow-500 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Floating Graphic */}
      <div className="absolute top-0 right-0">
        <img src="/assets/hero-graphic.png" alt="Hero Graphic" className="w-80 opacity-50" />
      </div>
    </div>
  );
};

export default Home;
