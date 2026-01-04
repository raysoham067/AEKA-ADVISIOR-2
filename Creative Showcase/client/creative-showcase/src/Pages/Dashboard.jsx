import { useEffect, useState } from "react";
import MasonryGrid from "../components/MasonryGrid";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchImages();
  }, [navigate]);

  const fetchImages = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/images/me", {
      headers: { Authorization: token }
    })
    .then(res => res.json())
    .then(data => {
      setImages(data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching images:", err);
      setLoading(false);
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select an image file");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/api/images/add", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("🎉 Image uploaded successfully!");
      setSelectedFile(null);
      setPreview(null);
      document.getElementById("imageInput").value = "";
      fetchImages();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            My Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your creative portfolio
          </p>
          {username && (
            <div className="mt-4">
              <Link
                to={`/profile/${username}`}
                className="inline-flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition shadow-lg"
              >
                <span>👁️</span>
                <span>View Public Profile</span>
              </Link>
            </div>
          )}
        </div>
        
        {/* Upload Form */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-12 max-w-3xl mx-auto border border-white/20">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
              <span className="text-2xl">📤</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Upload New Image</h2>
          </div>
          
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Choose Your Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition cursor-pointer bg-gray-50">
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
                <label htmlFor="imageInput" className="cursor-pointer">
                  {preview ? (
                    <div className="space-y-4">
                      <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-xl shadow-lg" />
                      <p className="text-sm text-gray-600">Click to change image</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-6xl">🖼️</div>
                      <div>
                        <p className="text-lg font-semibold text-gray-700">Click to select an image</p>
                        <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF, WebP up to 10MB</p>
                      </div>
                    </div>
                  )}
                </label>
              </div>
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: <span className="font-semibold">{selectedFile.name}</span> ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
            >
              {uploading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">⏳</span>
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <span className="mr-2">🚀</span>
                  Upload Image
                </span>
              )}
            </button>
          </form>
        </div>

        {/* My Images Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              My Gallery
            </h2>
            <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
              {images.length} {images.length === 1 ? 'Image' : 'Images'}
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading your artwork...</p>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20">
              <div className="text-7xl mb-6">🎨</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Your gallery is empty</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Start building your creative portfolio by uploading your first image above!
              </p>
            </div>
          ) : (
            <MasonryGrid images={images} />
          )}
        </div>
      </div>
    </div>
  );
}
