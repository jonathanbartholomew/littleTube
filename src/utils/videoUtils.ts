export const getYouTubeThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
};

// Function to get a background color based on video category
export const getVideoBorderColor = (category: string): string => {
  const colors: Record<string, string> = {
    songs: "border-accent-yellow",
    animals: "border-accent-orange",
    learning: "border-accent-green",
    cartoons: "border-accent-blue",
    default: "border-gray-200",
  };

  return colors[category] || colors.default;
};

// Video data type
export interface VideoData {
  id: string;
  title: string;
  category: string;
}

// Sample videos data
export const featuredVideos: VideoData[] = [
  {
    id: "K_Aq4H03Nm4",
    title:
      "Preschool & Toddler Learning Video with Ms Rachel - Learn Shapes, Letters, Numbers, Colors & More",
    category: "learning",
  },
  {
    id: "VxTI6BLQIl4",
    title: "Blippi Learns at the Children's Museum",
    category: "learning",
  },
  {
    id: "21XegpLrRjM",
    title:
      "“I Got That RHYTHM!” Dance Song 🦊🔥 Stomp Clap Brain Break | Danny Go! Songs for Kids",
    category: "songs",
  },
  {
    id: "5nriOLIIWJw",
    title: "Explore Nature with Elmo! | FOUR Sesame Street Full Episodes",
    category: "cartoons",
  },
];
