import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PersonalizedToggle from "./PersonalizedToggle";
import WaitlistModal from "./WaitlistModal";

const Hero = () => {
  const navigate = useNavigate();
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const handleCreateStory = () => {
    navigate('/create-story');
  };

  const handleTryFree = () => {
    setIsWaitlistOpen(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 animate-bounce delay-100">
          <Star className="w-6 h-6 text-yellow-400 fill-current" />
        </div>
        <div className="absolute top-32 right-20 animate-bounce delay-300">
          <Heart className="w-8 h-8 text-pink-400 fill-current" />
        </div>
        <div className="absolute bottom-32 left-20 animate-bounce delay-500">
          <Star className="w-4 h-4 text-purple-400 fill-current" />
        </div>
        <div className="absolute top-1/2 right-10 animate-bounce delay-700">
          <Heart className="w-6 h-6 text-orange-400 fill-current" />
        </div>
      </div>

      <div className="container mx-auto text-center relative z-10 max-w-6xl">
        <div className="max-w-4xl mx-auto px-6">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent leading-tight px-6">
            Magical Bedtime Stories
            <br />
            <span className="text-3xl md:text-5xl lg:text-6xl">Just for Your Child</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed px-6">
            AI-powered personalized stories with your voice, your child as the hero, 
            and beautiful custom illustrations that make every bedtime magical ✨
          </p>

          {/* Personalized Toggle Section */}
          <div className="mb-12 px-6">
            <PersonalizedToggle />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-6">
            <MagneticButton 
              onClick={handleCreateStory}
              className="px-8 py-4 rounded-full text-lg font-semibold shadow-xl"
            >
              Create Your First Story ✨
            </MagneticButton>
            <MagneticButton 
              onClick={handleTryFree}
              variant="outline" 
              className="border-2 border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950 px-8 py-4 rounded-full text-lg font-semibold bg-white dark:bg-gray-900"
              strength={0.15}
            >
              Try it now free 📱
            </MagneticButton>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm text-gray-500 dark:text-gray-400 px-6">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span>Trusted by 10,000+ families</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <span>🔒 Safe & Secure</span>
            <span className="hidden sm:inline">•</span>
            <span>📱 iOS & Android</span>
          </div>
        </div>
      </div>

      <WaitlistModal 
        isOpen={isWaitlistOpen} 
        onClose={() => setIsWaitlistOpen(false)} 
      />
    </section>
  );
};

export default Hero;
