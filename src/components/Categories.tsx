import React from "react";
import { Music, PawPrint, BookOpen, Tv } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

const Category: React.FC<CategoryProps> = ({ title, icon, color, onClick }) => {
  return (
    <motion.div
      className={`category-card ${color}`}
      onClick={onClick}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex flex-col items-center">
        <div className="mb-3">{icon}</div>
        <h3 className="text-xl font-display text-center">{title}</h3>
      </div>
    </motion.div>
  );
};

const Categories: React.FC = () => {
  // This would be replaced with actual navigation in a real app
  const handleCategoryClick = (category: string) => {
    console.log(`Navigating to ${category} category`);
  };

  return (
    <section className="my-8 px-6">
      <h2 className="text-2xl font-display mb-6 text-gray-800">
        What would you like to watch?
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <Category
          title="Songs"
          icon={<Music size={40} className="text-accent-yellow" />}
          color="border-accent-yellow"
          onClick={() => handleCategoryClick("songs")}
        />
        <Category
          title="Animals"
          icon={<PawPrint size={40} className="text-accent-orange" />}
          color="border-accent-orange"
          onClick={() => handleCategoryClick("animals")}
        />
        <Category
          title="Learning"
          icon={<BookOpen size={40} className="text-accent-green" />}
          color="border-accent-green"
          onClick={() => handleCategoryClick("learning")}
        />
        <Category
          title="Cartoons"
          icon={<Tv size={40} className="text-accent-blue" />}
          color="border-accent-blue"
          onClick={() => handleCategoryClick("cartoons")}
        />
      </div>
    </section>
  );
};

export default Categories;
