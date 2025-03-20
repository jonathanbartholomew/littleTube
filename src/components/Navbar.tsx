import React from "react";
import { Home, Search, Heart, User } from "lucide-react";
import { motion } from "framer-motion";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  isActive = false,
  onClick,
}) => {
  return (
    <motion.div
      className={`flex flex-col items-center ${
        isActive ? "text-primary" : "text-gray-500"
      }`}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <div className="text-current">{icon}</div>
      <span className="text-xs mt-1 font-display">{label}</span>
    </motion.div>
  );
};

const Navbar: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState("home");

  const handleNavClick = (item: string) => {
    setActiveItem(item);
    console.log(`Navigating to ${item}`);
    // This would handle actual navigation in a real app
  };

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-100 pt-3 pb-6 px-8 rounded-t-3xl shadow-lg"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <div className="flex justify-between items-center">
        <NavItem
          icon={<Home size={28} />}
          label="Home"
          isActive={activeItem === "home"}
          onClick={() => handleNavClick("home")}
        />
        <NavItem
          icon={<Search size={28} />}
          label="Search"
          isActive={activeItem === "search"}
          onClick={() => handleNavClick("search")}
        />
        <NavItem
          icon={<Heart size={28} />}
          label="Favorites"
          isActive={activeItem === "favorites"}
          onClick={() => handleNavClick("favorites")}
        />
        <NavItem
          icon={<User size={28} />}
          label="Profile"
          isActive={activeItem === "profile"}
          onClick={() => handleNavClick("profile")}
        />
      </div>
    </motion.nav>
  );
};

export default Navbar;
