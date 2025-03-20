import React from "react";
import { motion } from "framer-motion";

interface VideoProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  onClick: () => void;
}

const Video: React.FC<VideoProps> = ({ title, thumbnailUrl, onClick }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md overflow-hidden"
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="relative pb-[56.25%]">
        {" "}
        {/* 16:9 aspect ratio */}
        <img
          src={thumbnailUrl}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-t-2xl"
        />
      </div>
      <div className="p-3">
        <h4 className="font-display text-lg truncate">{title}</h4>
      </div>
    </motion.div>
  );
};

const FeaturedVideos: React.FC = () => {
  // Mock data - would come from an API in a real app
  const videos = [
    {
      id: "dQw4w9WgXcQ",
      title: "Baby Shark Dance",
      thumbnailUrl: "/api/placeholder/400/225",
    },
    {
      id: "VxTI6BLQIl4",
      title: "Blippi Learns at the Children's Museum",
      category: "learning",
      thumbnailUrl: "/api/placeholder/400/225",
    },
    {
      id: "XqZsoesa55w",
      title: "The Wheels on the Bus",
      thumbnailUrl: "/api/placeholder/400/225",
    },
    {
      id: "5nriOLIIWJw",
      title: "Explore Nature with Elmo! | FOUR Sesame Street Full Episodes",
      thumbnailUrl: "/api/placeholder/400/225",
    },
  ];

  const handleVideoClick = (videoId: string) => {
    console.log(`Playing video with ID: ${videoId}`);
    // This would navigate to a video player screen in a real app
  };

  return (
    <section className="my-8 px-6">
      <h2 className="text-2xl font-display mb-6 text-gray-800">
        Featured Videos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {videos.map((video) => (
          <Video
            key={video.id}
            id={video.id}
            title={video.title}
            thumbnailUrl={video.thumbnailUrl}
            onClick={() => handleVideoClick(video.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedVideos;
