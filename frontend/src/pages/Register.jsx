import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../redux/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullname || !formData.email || !formData.password) {
      toast.error("All fields are required!");
      return;
    }
    try {
      const result = await dispatch(register(formData)).unwrap();
      localStorage.setItem("user", JSON.stringify(result));
      toast.success("Registration successful! Please log in.");
      
      // Clear form fields after successful registration
      setFormData({ fullname: "", email: "", password: "" });
      
      navigate("/login");
    } catch (error) {
      toast.error(error || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Register</h2>
        <p className="text-gray-600 text-center">Create an account to explore projects</p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-4" autoComplete="off">
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname || ""}
            onChange={handleChange}
            autoComplete="off"
            className="w-full p-2 border rounded-md mb-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email || ""}
            onChange={handleChange}
            autoComplete="off"
            className="w-full p-2 border rounded-md mb-2"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password || ""}
            onChange={handleChange}
            autoComplete="off"
            className="w-full p-2 border rounded-md mb-2"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
