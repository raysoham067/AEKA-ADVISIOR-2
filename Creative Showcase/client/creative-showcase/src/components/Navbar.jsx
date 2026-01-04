import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("username");
      setIsLoggedIn(!!token);
      setUsername(user || "");
    };
    
    checkAuth();
    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkAuth);
    
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/");
    window.location.reload(); // Refresh to update state
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3 group">
            <span className="text-4xl group-hover:scale-110 transition-transform filter drop-shadow-lg">🎨</span>
            <span className="text-2xl font-bold text-white drop-shadow-md">Creative Showcase</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white hover:text-purple-200 transition font-semibold flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10"
                >
                  <span>📊</span>
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                {username && (
                  <Link
                    to={`/profile/${username}`}
                    className="text-white hover:text-purple-200 transition font-semibold flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10"
                  >
                    <span>👤</span>
                    <span className="hidden sm:inline">Profile</span>
                  </Link>
                )}
                <div className="flex items-center space-x-3 pl-4 border-l border-white/30">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-purple-600 font-bold shadow-md">
                      {username.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white font-semibold hidden md:block">{username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition font-semibold shadow-md hover:shadow-lg"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-purple-200 transition font-semibold px-4 py-2 rounded-lg hover:bg-white/10"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
