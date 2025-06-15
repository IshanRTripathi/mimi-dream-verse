
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import InteractiveFeatureCard from "./InteractiveFeatureCard";
import { motion } from "framer-motion";
import { loadInteractiveFeatures } from "@/utils/configLoader";

const InteractiveFeaturesSection = () => {
  const features = loadInteractiveFeatures();

  return (
    <section className="section-spacing bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10"></div>
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-responsive-xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-rounded">
            Features That Make Magic ✨
          </h2>
          <p className="text-responsive-md text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-rounded leading-relaxed">
            Everything you need to create personalized, engaging bedtime stories that your children will treasure forever
          </p>
        </motion.div>

        {/* Enhanced Scrollable Layout */}
        <div className="relative">
          <ScrollArea className="w-full">
            <div className="flex gap-8 pb-6 px-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <InteractiveFeatureCard {...feature} />
                </motion.div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full" />
          </ScrollArea>
          
          {/* Scroll indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {features.map((_, index) => (
              <div 
                key={index} 
                className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors duration-300"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveFeaturesSection;
