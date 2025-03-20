import React, { useEffect, useRef } from "react";

interface VideoPlayerProps {
  videoId: string;
  onClose?: () => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

let youtubeApiLoaded = false;

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, onClose }) => {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-4xl mx-4">
        {/* Close button */}
        <button
          className="absolute -top-10 right-0 bg-white rounded-full p-2 z-10"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Video container */}
        <div className="relative pb-[56.25%] bg-black">
          {" "}
          {/* 16:9 aspect ratio */}
          <div
            ref={playerContainerRef}
            className="absolute top-0 left-0 w-full h-full"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
