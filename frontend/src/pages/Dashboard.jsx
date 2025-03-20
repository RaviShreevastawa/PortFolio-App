import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col items-center">
        {/* Profile Picture */}
        <img 
          src={user.profilePicture || "/default-avatar.png"} 
          alt="Profile" 
          className="w-24 h-24 rounded-full shadow-md mb-3"
        />

        {/* Welcome Message */}
        <h2 className="text-3xl font-bold text-center">
          Welcome, {user.fullname}!
        </h2>
        <p className="text-gray-600 mt-2">{user.email}</p>

        {/* Link to Upload Profile Picture */}
        <Link to="/profile" className="text-blue-600 mt-4 hover:underline">
          Update Profile Picture
        </Link>
      </div>

      <hr className="my-6" />

      {/* Admin Controls */}
      {user.role === "admin" ? (
        <div>
          <h3 className="text-xl font-semibold mb-4">Admin Panel</h3>
          <p className="text-gray-700">You can create, update, and delete projects.</p>
          <Link 
            to="/projects/manage" 
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Manage Projects
          </Link>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-4">User Dashboard</h3>
          <p className="text-gray-700">Explore amazing projects.</p>
          <Link 
            to="/projects" 
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Projects
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
