import { VideoData } from "../utils/videoUtils";

// Replace with your actual API key from Google Developer Console
const API_KEY = "YOUR_API_KEY_HERE";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

// Fetch videos for kids by category
export async function fetchKidVideos(
  category: string = "kids",
  maxResults: number = 10
): Promise<VideoData[]> {
  // You can modify these search parameters to get more targeted results
  const searchParams = {
    part: "snippet",
    maxResults,
    q: `${category} for kids`,
    type: "video",
    videoCategoryId: "1", // Film & Animation
    videoEmbeddable: "true",
    safeSearch: "strict",
    key: API_KEY,
  };

  try {
    const queryString = Object.entries(searchParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join("&");

    const response = await fetch(`${BASE_URL}/search?${queryString}`);

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      category: category,
      thumbnail: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.channelTitle,
    }));
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}

// Fetch videos from specific kid-friendly channels
export async function fetchFromKidChannels(
  maxResults: number = 10
): Promise<VideoData[]> {
  // List of kid-friendly YouTube channel IDs
  // You should research and populate this with channels you've verified as appropriate
  const kidChannels = [
    "UC5PV1Jt-DxRyYQjZQUzBDRA", // CoComelon
    "UCbCmjCuTUZos6Inko4u57UQ", // Blippi
    "UCgFXm4TI8htWmCyJ6cVPG_A", // Little Baby Bum
    // Add more verified kid-friendly channels
  ];

  // Randomly select one channel to fetch from
  const randomChannel =
    kidChannels[Math.floor(Math.random() * kidChannels.length)];

  const searchParams = {
    part: "snippet",
    maxResults,
    channelId: randomChannel,
    order: "date", // Get newest videos
    type: "video",
    key: API_KEY,
  };

  try {
    const queryString = Object.entries(searchParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join("&");

    const response = await fetch(`${BASE_URL}/search?${queryString}`);
    const data = await response.json();

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      category: "featured",
      thumbnail: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.channelTitle,
    }));
  } catch (error) {
    console.error("Error fetching from kid channels:", error);
    return [];
  }
}

// Helper function to determine what category a video belongs to based on title keywords
export function categorizeVideo(title: string): string {
  const lowerTitle = title.toLowerCase();

  if (
    lowerTitle.includes("song") ||
    lowerTitle.includes("music") ||
    lowerTitle.includes("sing")
  ) {
    return "songs";
  } else if (
    lowerTitle.includes("animal") ||
    lowerTitle.includes("zoo") ||
    lowerTitle.includes("pet")
  ) {
    return "animals";
  } else if (
    lowerTitle.includes("learn") ||
    lowerTitle.includes("education") ||
    lowerTitle.includes("abc")
  ) {
    return "learning";
  } else if (
    lowerTitle.includes("cartoon") ||
    lowerTitle.includes("animation")
  ) {
    return "cartoons";
  }

  return "featured";
}
