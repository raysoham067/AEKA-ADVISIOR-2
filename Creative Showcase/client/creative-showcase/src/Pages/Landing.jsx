import { useEffect, useState } from "react";
import MasonryGrid from "../components/MasonryGrid";
import { Link } from "react-router-dom";

export default function Landing() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/images/all")
      .then(res => res.json())
      .then(data => {
        setImages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching images:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 animate-float">
              <span className="text-7xl">🎨</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Creative Showcase
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Where Art Meets Digital Memories
            </p>
            <p className="text-lg mb-10 text-purple-50 max-w-2xl mx-auto">
              Discover, share, and celebrate the creative work of talented artists from around the world. 
              Upload your digital artwork, photography, and memories to showcase your unique vision.
            </p>
            {!isLoggedIn && (
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg hover:bg-purple-50 transition-all shadow-2xl hover:scale-105 transform duration-300"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
                >
                  Sign In
                </Link>
              </div>
            )}
            {isLoggedIn && (
              <Link
                to="/dashboard"
                className="inline-block px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg hover:bg-purple-50 transition-all shadow-2xl hover:scale-105 transform duration-300"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
        
        {/* Decorative waves */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249 250 251)"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Why Choose Creative Showcase?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Everything you need to showcase your creative work
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 hover-lift card-shadow">
              <div className="text-5xl mb-4">📸</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Easy Upload</h3>
              <p className="text-gray-600">
                Upload your artwork in seconds. Support for all major image formats with automatic optimization.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-blue-50 border border-pink-100 hover-lift card-shadow">
              <div className="text-5xl mb-4">🌐</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Public Profiles</h3>
              <p className="text-gray-600">
                Share your unique profile link with the world. Showcase your portfolio to clients and fans.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 hover-lift card-shadow">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Beautiful Gallery</h3>
              <p className="text-gray-600">
                Stunning masonry layout that makes your artwork shine. Responsive design for all devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            <div>
              <div className="text-5xl font-bold mb-2">{images.length}+</div>
              <div className="text-purple-100 text-lg">Artworks Shared</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-purple-100 text-lg">Free Forever</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">∞</div>
              <div className="text-purple-100 text-lg">Creative Possibilities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Explore Creative Works
            </h2>
            <p className="text-gray-600 text-lg">
              Discover amazing artwork from our community
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading amazing artwork...</p>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg max-w-2xl mx-auto">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">No artwork yet</h3>
              <p className="text-gray-600 mb-6">
                Be the first to share your creative work with the world!
              </p>
              {!isLoggedIn && (
                <Link
                  to="/signup"
                  className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-lg"
                >
                  Get Started
                </Link>
              )}
            </div>
          ) : (
            <MasonryGrid images={images} />
          )}
        </div>
      </section>

      {/* CTA Section */}
      {!isLoggedIn && (
        <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Showcase Your Art?
            </h2>
            <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
              Join thousands of artists sharing their creative work. It's free and takes less than a minute.
            </p>
            <Link
              to="/signup"
              className="inline-block px-10 py-5 bg-white text-purple-600 rounded-full font-bold text-xl hover:bg-purple-50 transition-all shadow-2xl hover:scale-105 transform duration-300"
            >
              Create Your Account →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
