
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import InteractiveFeatureCard from "./InteractiveFeatureCard";
import { motion } from "framer-motion";

const InteractiveFeaturesSection = () => {
  const features = [
    {
      title: "Accessibility First",
      description: "Stories designed with dyslexia-friendly fonts and color-blind accessible themes for every child.",
      images: {
        primary: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop&crop=faces",
        secondary: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=faces"
      },
      theme: "accessibility" as const
    },
    {
      title: "Emotional Storytelling", 
      description: "Characters that teach empathy, kindness, and emotional intelligence through heartwarming adventures.",
      images: {
        primary: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop&crop=faces",
        secondary: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center"
      },
      theme: "emotional" as const
    },
    {
      title: "Imagination Comes Alive",
      description: "Watch characters leap from pages with magical sparkles in immersive, fantastical worlds.",
      images: {
        primary: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
        secondary: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop&crop=center"
      },
      theme: "imagination" as const
    },
    {
      title: "Build Your Own Stories",
      description: "Create personalized adventures with interactive storytelling tools and custom character cards.",
      images: {
        primary: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop&crop=faces",
        secondary: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=faces"
      },
      theme: "building" as const
    }
  ];

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

        {/* Desktop Grid Layout */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <InteractiveFeatureCard {...feature} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Scrollable Layout */}
        <div className="sm:hidden">
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
      </div>
    </section>
  );
};

export default InteractiveFeaturesSection;
