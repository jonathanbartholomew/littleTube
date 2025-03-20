import React from "react";
import { motion } from "framer-motion";
import { Star, Play } from "lucide-react";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

const Logo: React.FC<LogoProps> = ({ size = "medium" }) => {
  const sizes = {
    small: {
      container: "h-10 w-10",
      icon: 24,
      playIcon: 12,
      textSize: "text-lg",
    },
    medium: {
      container: "h-16 w-16",
      icon: 36,
      playIcon: 16,
      textSize: "text-2xl",
    },
    large: {
      container: "h-24 w-24",
      icon: 48,
      playIcon: 24,
      textSize: "text-3xl",
    },
  };

  const currentSize = sizes[size];

  return (
    <div className="flex items-center">
      <motion.div
        className={`relative ${currentSize.container} mr-2`}
        whileHover={{ rotate: 10 }}
      >
        <Star size={currentSize.icon} className="text-primary" fill="#FF6B6B" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Play
            size={currentSize.playIcon}
            className="text-white"
            fill="white"
          />
        </div>
      </motion.div>
      <motion.h1
        className={`font-display ${currentSize.textSize} text-primary`}
        whileHover={{ scale: 1.05 }}
      >
        <span className="text-primary">Little</span>
        <span className="text-accent-blue">Tube</span>
      </motion.h1>
    </div>
  );
};

export default Logo;
