import { useState } from "react";
import {
  Home,
  Search,
  Heart,
  User,
  Star,
  Play,
  Music,
  PawPrint,
  BookOpen,
  Tv,
} from "lucide-react";
import {
  featuredVideos,
  getVideoBorderColor,
  getYouTubeThumbnail,
} from "./utils/videoUtils";
import VideoPage from "./components/VideoPage";

function App() {
  const [activeNavItem, setActiveNavItem] = useState("home");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    console.log(`Navigating to ${category} category`);
  };

  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  const handleNavClick = (item: string) => {
    setActiveNavItem(item);
    console.log(`Navigating to ${item}`);
  };

  // If a video is selected, show the video page
  if (selectedVideo) {
    return (
      <VideoPage
        videoId={selectedVideo}
        onBack={handleCloseVideo}
        onSelectVideo={setSelectedVideo}
      />
    );
  }

  return (
    <div className="pb-24 min-h-screen">
      {/* Header */}
      <header className="app-header">
        <div className="logo-wrapper">
          <div className="relative h-10 w-10">
            <Star size={36} className="text-pink-500" fill="#FF6B6B" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Play size={14} className="text-white" fill="white" />
            </div>
          </div>
          <h1 className="logo-text">
            <span className="logo-text-little">Little</span>
            <span className="logo-text-tube">Tube</span>
          </h1>
        </div>

        <button className="parent-mode-button">Parent Mode</button>
      </header>

      <main>
        {/* Categories Section */}
        <section className="categories-section">
          <h2 className="section-title">What would you like to watch?</h2>

          <div className="categories-grid">
            <div
              className="category-card category-songs"
              onClick={() => handleCategoryClick("songs")}
            >
              <div className="category-icon">
                <Music size={32} color="#FFD166" />
              </div>
              <h3 className="category-title">Songs</h3>
            </div>

            <div
              className="category-card category-animals"
              onClick={() => handleCategoryClick("animals")}
            >
              <div className="category-icon">
                <PawPrint size={32} color="#FF9E00" />
              </div>
              <h3 className="category-title">Animals</h3>
            </div>

            <div
              className="category-card category-learning"
              onClick={() => handleCategoryClick("learning")}
            >
              <div className="category-icon">
                <BookOpen size={32} color="#76C893" />
              </div>
              <h3 className="category-title">Learning</h3>
            </div>

            <div
              className="category-card category-cartoons"
              onClick={() => handleCategoryClick("cartoons")}
            >
              <div className="category-icon">
                <Tv size={32} color="#48CAE4" />
              </div>
              <h3 className="category-title">Cartoons</h3>
            </div>
          </div>
        </section>

        {/* Featured Videos Section */}
        <section className="featured-section">
          <h2 className="section-title">Featured Videos</h2>

          <div className="videos-grid">
            {featuredVideos.map((video) => (
              <div
                key={video.id}
                className={`video-card ${getVideoBorderColor(video.category)}`}
                onClick={() => handleVideoClick(video.id)}
              >
                <div className="video-thumbnail">
                  <img
                    src={getYouTubeThumbnail(video.id)}
                    alt={video.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center hover:bg-opacity-10 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                      <Play size={24} className="text-gray-800 ml-1" />
                    </div>
                  </div>
                </div>
                <div className="video-info">
                  <h4 className="video-title">{video.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div
          className={`nav-item ${activeNavItem === "home" ? "nav-active" : ""}`}
          onClick={() => handleNavClick("home")}
        >
          <Home size={24} className="nav-icon" />
          <span className="nav-label">Home</span>
        </div>

        <div
          className={`nav-item ${
            activeNavItem === "search" ? "nav-active" : ""
          }`}
          onClick={() => handleNavClick("search")}
        >
          <Search size={24} className="nav-icon" />
          <span className="nav-label">Search</span>
        </div>

        <div
          className={`nav-item ${
            activeNavItem === "favorites" ? "nav-active" : ""
          }`}
          onClick={() => handleNavClick("favorites")}
        >
          <Heart size={24} className="nav-icon" />
          <span className="nav-label">Favorites</span>
        </div>

        <div
          className={`nav-item ${
            activeNavItem === "profile" ? "nav-active" : ""
          }`}
          onClick={() => handleNavClick("profile")}
        >
          <User size={24} className="nav-icon" />
          <span className="nav-label">Profile</span>
        </div>
      </nav>
    </div>
  );
}

export default App;
