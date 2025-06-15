
import { useState } from "react";
import { motion } from "framer-motion";

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

  const getThemeColors = (theme: string) => {
    const themes = {
      accessibility: "from-blue-500/20 to-indigo-500/20",
      emotional: "from-pink-500/20 to-rose-500/20", 
      imagination: "from-purple-500/20 to-violet-500/20",
      building: "from-green-500/20 to-emerald-500/20"
    };
    return themes[theme as keyof typeof themes] || themes.accessibility;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-[#FAF8F4] dark:bg-[#1E1E1E] rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/50 dark:border-gray-700/50 flex-shrink-0 w-72 sm:w-80 md:w-72 lg:w-80 overflow-hidden"
    >
      {/* Image Container - Full width, 1:1 aspect ratio */}
      <div className="relative w-full aspect-square overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${getThemeColors(theme)} z-10`}></div>
        
        {/* Primary Image */}
        <motion.img
          src={images.primary}
          alt={`${title} - primary`}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        
        {/* Secondary Image */}
        <motion.img
          src={images.secondary}
          alt={`${title} - secondary`}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      {/* Content - With padding */}
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold mb-2 text-[#2B2B2B] dark:text-[#F1F1F1] font-rounded">
          {title}
        </h3>
        <p className="text-[#2B2B2B]/80 dark:text-[#F1F1F1]/80 text-sm leading-relaxed font-rounded">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default InteractiveFeatureCard;
