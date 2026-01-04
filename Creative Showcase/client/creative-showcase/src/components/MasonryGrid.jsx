import { Link } from "react-router-dom";

export default function MasonryGrid({ images }) {
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "";
    // If it's already a full URL, return as is
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }
    // Otherwise, prepend the backend URL
    return `http://localhost:5000${imageUrl}`;
  };

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
      {images.map(img => (
        <div key={img._id} className="mb-6 break-inside-avoid">
          <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-white">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={getImageUrl(img.imageUrl)}
                alt={img.userId?.username ? `${img.userId.username}'s artwork` : "artwork"}
                className="w-full h-auto rounded-2xl transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x400?text=Image+Not+Found";
                }}
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                {img.userId?.username && (
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <Link
                      to={`/profile/${img.userId.username}`}
                      className="flex items-center space-x-2 text-white hover:text-purple-200 transition"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                        {img.userId.username.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold">@{img.userId.username}</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            {/* Decorative border on hover */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-400 transition-all duration-300 pointer-events-none"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
