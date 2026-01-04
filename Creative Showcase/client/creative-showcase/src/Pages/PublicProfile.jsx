import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MasonryGrid from "../components/MasonryGrid";

export default function PublicProfile() {
  const { username } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/images/user/${username}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setError(data.message);
        } else {
          setImages(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching images:", err);
        setError("Failed to load profile");
        setLoading(false);
      });
  }, [username]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50">
      <div className="container mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white text-5xl font-bold shadow-2xl">
              {username.charAt(0).toUpperCase()}
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            @{username}
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Creative Portfolio
          </p>
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-lg rounded-full shadow-lg border border-white/20">
            <span className="text-2xl">🖼️</span>
            <span className="font-semibold text-gray-700">
              {images.length} {images.length === 1 ? 'Artwork' : 'Artworks'}
            </span>
          </div>
        </div>
        
        {/* Gallery Section */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading gallery...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 max-w-2xl mx-auto">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Profile Not Found</h3>
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 max-w-2xl mx-auto">
            <div className="text-7xl mb-6">🎨</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">No artwork yet</h3>
            <p className="text-gray-600">
              This artist hasn't shared any work yet. Check back soon!
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Gallery</h2>
              <p className="text-gray-600">Explore the creative work of @{username}</p>
            </div>
            <MasonryGrid images={images} />
          </div>
        )}
      </div>
    </div>
  );
}
