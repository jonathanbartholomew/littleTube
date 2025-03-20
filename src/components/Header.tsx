import React from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";

const Header: React.FC = () => {
  return (
    <motion.header
      className="bg-white py-4 px-6 flex justify-between items-center rounded-b-3xl shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <Logo />

      <motion.button
        className="bg-white text-primary text-sm px-4 py-2 rounded-xl font-display"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Parent Mode
      </motion.button>
    </motion.header>
  );
};

export default Header;
