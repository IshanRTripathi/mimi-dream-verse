
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import InteractiveFeatureCard from "./InteractiveFeatureCard";
import { motion } from "framer-motion";
import { loadInteractiveFeatures } from "@/utils/configLoader";

const InteractiveFeaturesSection = () => {
  const features = loadInteractiveFeatures();

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-rounded">
            Features That Make Magic ✨
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-rounded">
            Everything you need to create personalized, engaging bedtime stories that your children will treasure forever
          </p>
        </motion.div>

        {/* Single Row Scrollable Layout */}
        <ScrollArea className="w-full">
          <div className="flex gap-6 pb-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <InteractiveFeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default InteractiveFeaturesSection;
