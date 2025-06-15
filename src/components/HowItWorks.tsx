
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { loadHowItWorksSteps } from "@/utils/configLoader";
import AnimatedSlideshow from "./AnimatedSlideshow";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const steps = loadHowItWorksSteps();
  const navigate = useNavigate();

  const handleTryNow = () => {
    navigate('/create-story');
  };

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent px-4">
            How StoryMimi Works
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Creating magical personalized stories is as easy as 1-2-3-4! 
            Get your first story ready in just minutes.
          </p>
        </div>

        {/* Animated Slideshow */}
        <AnimatedSlideshow slides={steps} />

        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-16">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-3xl p-6 md:p-8 max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              ⏱️ Ready in Minutes!
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6">
              Your first personalized story will be ready in just 3-5 minutes. 
              Perfect for tonight's bedtime!
            </p>
            
            <Button 
              onClick={handleTryNow}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-6 md:px-8 py-3 rounded-full text-base md:text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 mb-4 md:mb-6 w-full sm:w-auto"
              size="lg"
            >
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Try It Now - Free!
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
            </Button>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-xs md:text-sm text-gray-500 dark:text-gray-400">
              <span>🚀 Instant Generation</span>
              <span className="hidden sm:inline">•</span>
              <span>🎯 100% Personalized</span>
              <span className="hidden sm:inline">•</span>
              <span>❤️ Made with Love</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
