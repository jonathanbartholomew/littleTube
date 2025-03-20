import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, MoreVertical, Play } from "lucide-react";
import {
  featuredVideos,
  getYouTubeThumbnail,
  VideoData,
} from "../utils/videoUtils";

interface VideoPageProps {
  videoId: string;
  onBack: () => void;
  onSelectVideo: (videoId: string) => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

let youtubeApiLoaded = false;

const VideoPage: React.FC<VideoPageProps> = ({
  videoId,
  onBack,
  onSelectVideo,
}) => {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);
  const [showRecommended, setShowRecommended] = useState(true);
  const [currentVideo, setCurrentVideo] = useState<VideoData | null>(null);

  // Find current video data
  useEffect(() => {
    const video = featuredVideos.find((v) => v.id === videoId) || null;
    setCurrentVideo(video);
  }, [videoId]);

  // Load YouTube API and initialize player
  useEffect(() => {
    // Load the YouTube API script if not already loaded
    if (!youtubeApiLoaded) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScript = document.getElementsByTagName("script")[0];
      firstScript.parentNode?.insertBefore(tag, firstScript);

      // Set up callback for when API is ready
      window.onYouTubeIframeAPIReady = () => {
        youtubeApiLoaded = true;
        initializePlayer();
      };
    } else {
      // If API is already loaded, initialize the player directly
      initializePlayer();
    }

    // Clean up
    return () => {
      if (playerInstanceRef.current) {
        playerInstanceRef.current.destroy();
      }
    };
  }, [videoId]);

  const initializePlayer = () => {
    if (!playerContainerRef.current) return;

    // First ensure any previous player is destroyed
    if (playerInstanceRef.current) {
      playerInstanceRef.current.destroy();
    }

    // Create new player
    playerInstanceRef.current = new window.YT.Player(
      playerContainerRef.current,
      {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          controls: 1,
          rel: 0, // Don't show related videos
          fs: 1, // Allow fullscreen
          playsinline: 1, // Play inline on mobile
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
          },
        },
      }
    );
  };

  const toggleRecommended = () => {
    setShowRecommended(!showRecommended);
  };

  const handleVideoSelect = (newVideoId: string) => {
    if (newVideoId !== videoId) {
      onSelectVideo(newVideoId);
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col z-50">
      {/* Top navigation */}
      <div className="flex justify-between items-center px-4 py-3 bg-white shadow-sm">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100">
          <ArrowLeft size={24} />
        </button>
        <div className="text-lg font-bold truncate mx-2">
          {currentVideo?.title || "Video Player"}
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <MoreVertical size={24} />
        </button>
      </div>

      {/* Video player */}
      <div className="relative w-full bg-black">
        <div className="aspect-video">
          <div
            ref={playerContainerRef}
            className="absolute top-0 left-0 w-full h-full"
          ></div>
        </div>
      </div>

      {/* Recommended videos toggle */}
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <div className="text-lg font-semibold">Recommended Videos</div>
        <button
          onClick={toggleRecommended}
          className="text-sm font-medium text-blue-500"
        >
          {showRecommended ? "Hide" : "Show"}
        </button>
      </div>

      {/* Recommended videos */}
      {showRecommended && (
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <div className="grid grid-cols-1 gap-4">
            {featuredVideos
              .filter((video) => video.id !== videoId)
              .map((video) => (
                <div
                  key={video.id}
                  className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                  onClick={() => handleVideoSelect(video.id)}
                >
                  <div className="relative w-32 h-20 flex-shrink-0">
                    <img
                      src={getYouTubeThumbnail(video.id)}
                      alt={video.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center hover:bg-black hover:bg-opacity-10">
                      <div className="w-8 h-8 rounded-full bg-white bg-opacity-70 flex items-center justify-center">
                        <Play size={16} className="text-gray-800 ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium line-clamp-2">{video.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Category: {video.category}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPage;
