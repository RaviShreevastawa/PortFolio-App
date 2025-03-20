import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(user?.profilePicture || "");
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Show preview
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    try {
      const { data } = await axios.put("/api/v1/users/profile", formData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile picture updated!");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to update profile picture.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-3xl font-bold mb-4">Your Profile</h2>
      
      <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg">
        {preview ? (
          <img src={preview} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="bg-gray-300 w-full h-full flex items-center justify-center">
            <span>No Image</span>
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        className="mt-4"
        onChange={handleFileChange}
      />

      <button
        onClick={handleUpload}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </div>
  );
};

export default Profile;
