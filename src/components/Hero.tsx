
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Play, Pause, Heart, Star } from "lucide-react";
import PersonalizedToggle from "./PersonalizedToggle";

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
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
        <div className="max-w-4xl mx-auto px-4">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent leading-tight px-4">
            Magical Bedtime Stories
            <br />
            <span className="text-3xl md:text-5xl lg:text-6xl">Just for Your Child</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            AI-powered personalized stories with your voice, your child as the hero, 
            and beautiful custom illustrations that make every bedtime magical ✨
          </p>

          {/* Personalized Toggle Section */}
          <div className="mb-12 px-4">
            <PersonalizedToggle />
          </div>

          {/* Voice Demo Section */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-8 shadow-xl border border-purple-100 dark:border-gray-700 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              🎙️ Hear it in Your Voice
            </h3>
            <div className="flex items-center justify-center gap-4 mb-4">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full w-16 h-16 shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </Button>
              <div className="text-left">
                <p className="font-medium text-gray-800 dark:text-gray-200">Preview: Mom's Voice</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isPlaying ? "Playing..." : "Tap to hear sample"}
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-2xl p-4">
              <p className="text-sm italic text-gray-700 dark:text-gray-300">
                "Once upon a time, little Emma discovered a magical garden where butterflies danced and flowers sang beautiful melodies..."
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <MagneticButton className="px-8 py-4 rounded-full text-lg font-semibold shadow-xl">
              Create Your First Story ✨
            </MagneticButton>
            <Button variant="outline" className="border-2 border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950 px-8 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-200">
              Watch Demo 📱
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm text-gray-500 dark:text-gray-400 px-4">
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
    </section>
  );
};

export default Hero;
