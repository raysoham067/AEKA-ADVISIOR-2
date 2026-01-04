import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ email:"", password:"" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      
      if (res.ok) {
        localStorage.setItem("token", json.token);
        localStorage.setItem("username", json.username);
        navigate("/dashboard");
      } else {
        setError(json.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Simple navbar for login page */}
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center space-x-2 text-white hover:text-purple-200 transition">
            <span className="text-3xl">🎨</span>
            <span className="text-xl font-bold">Creative Showcase</span>
          </Link>
        </div>
        
        <div className="relative bg-white/95 backdrop-blur-lg p-8 md:p-10 rounded-3xl shadow-2xl border border-white/30">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4">
              <span className="text-4xl">🎨</span>
            </div>
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome Back!
            </h2>
            <p className="text-gray-600">
              Sign in to continue your creative journey
            </p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center space-x-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition bg-gray-50"
                type="email"
                placeholder="you@example.com"
                value={data.email}
                onChange={e=>setData({...data, email:e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition bg-gray-50"
                type="password"
                placeholder="••••••••"
                value={data.password}
                onChange={e=>setData({...data, password:e.target.value})}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">⏳</span>
                  Logging in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-600 hover:text-purple-700 font-bold underline">
                Create one now →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
