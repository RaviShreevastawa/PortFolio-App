import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  console.log(user.profileImage)

  return (
    <div className="max-w-4xl mx-auto bg-transparent shadow-lg rounded-xl mt-50 w-1/2">
      <div className="flex flex-col items-center text-center">
        {/* Profile Picture */}
        <div className="relative">
          <img
            src={`http://localhost:4000/uploads/${user.profileImage}`}
            alt="Profile"
            className="w-28 h-28 rounded-full shadow-md object-cover border-4 border-blue-500"
          />
          <Link
            to="/profile"
            className="absolute bottom-1 right-1 bg-blue-600 text-white px-2 py-1 text-xs rounded-full hover:bg-blue-700 transition"
          >
            Edit
          </Link>
        </div>

        {/* Welcome Message */}
        <h2 className="text-4xl font-bold mt-4 p-4 text-black">Welcome, {user.fullname}!</h2>
        {/*<p className="text-gray-500 mt-2">{user.email}</p>*/}
      </div>

      <hr className="m-10"/>

      {/* Role-based Dashboard */}
      <div className="text-center">
        {user.role === "admin" ? (
          <div>
            <h3 className="text-2xl font-semibold text-blue-600">Admin Panel</h3>
            <p className="text-black mt-2">Manage users and projects efficiently.</p>
            <Link
              to="/projects/manage"
              className="mt-4 mb-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Manage Projects
            </Link>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-semibold text-green-600">User Dashboard</h3>
            <p className="text-gray-600 mt-2">Explore and contribute to amazing projects.</p>
            <Link
              to="/projects"
              className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition shadow-md"
            >
              View Projects
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;