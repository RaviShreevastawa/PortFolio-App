import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import profile from '../assets/Profile-Pic.png'

const Home = () => {
  const { user, admin } = useSelector((state) => state.auth);

  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 grid grid-cols-1 md:grid-cols-2 w-screen overflow-hidden">
      <div className="text-center mt-10">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          Welcome to My Portfolio
        </h1>
        <p className="text-lg md:text-xl mb-6 mt-10">
          Showcasing innovative projects and creativity. Explore and get inspired!
        </p>

        <div className="flex justify-center">
          {user && (
            <>
              {admin && (
                <>
                  <Link to="/dashboard" className="border p-5 rounded-md">
                    Go to Dashboard
                  </Link>
                </>
              )}
              {!admin && (
                <>
                  <Link to="hero" className="border p-5 rounded-md">
                    Explore Projects
                  </Link>
                </>
              )}
            </>
          )}
          {!user &&(
            <>
               <div className="flex">
                <Link to="/login" className="bg-transparent border text-black py-3 text-lg rounded-lg">
                  Login
                </Link>
                <Link to="/register" className="bg-transparent text-lg border rounded-lg">
                  Register
                </Link>
               </div>
            </>
          )}
        </div>
      </div>

      {/* Floating Graphic */}
      <div className="">
        <img src={profile} alt="Nothing Uploaded" className="w-screen h-screen top-0" />
      </div>
    </div>
  );
};

export default Home;
