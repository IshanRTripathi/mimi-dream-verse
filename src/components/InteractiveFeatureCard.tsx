import { useState } from "react";
import { motion } from "framer-motion";
import { AssetManager } from "@/utils/assetManager";

interface InteractiveFeatureCardProps {
  title: string;
  description: string;
  images: {
    primary: string;
    secondary: string;
  };
  theme: "accessibility" | "emotional" | "imagination" | "building";
}

const InteractiveFeatureCard = ({ title, description, images, theme }: InteractiveFeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-soft hover:shadow-large transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 flex-shrink-0 w-72 sm:w-80 md:w-72 lg:w-80 overflow-hidden hover:scale-105"
    >
      {/* Image Container - Full width, 16:10 aspect ratio for better proportions */}
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-3xl">
        {/* Primary Image */}
        <motion.img
          src={AssetManager.images.getByPath(images.primary)}
          alt={`${title} - primary`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        
        {/* Secondary Image */}
        <motion.img
          src={AssetManager.images.getByPath(images.secondary)}
          alt={`${title} - secondary`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {/* Subtle gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-50"></div>
      </div>

      {/* Content - With better padding and typography */}
      <div className="p-6 text-center space-y-3">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white font-rounded leading-tight">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-rounded">
          {description}
        </p>
        
        {/* Subtle interactive indicator */}
        <div className="flex justify-center pt-2">
          <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-300 group-hover:w-12"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveFeatureCard;
