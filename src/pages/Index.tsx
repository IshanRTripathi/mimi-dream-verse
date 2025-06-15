
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import BackgroundMusic from "@/components/BackgroundMusic";
import AccessibilityToggle from "@/components/AccessibilityToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 transition-colors duration-300">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand - Left Side */}
          <div className="flex items-center">
            <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-white/30 dark:border-gray-700/30 rounded-2xl px-6 py-3 shadow-lg">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                StoryMimi ✨
              </h1>
            </div>
          </div>
          
          {/* Controls - Right Side */}
          <div className="flex items-center gap-2 md:gap-3 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-white/30 dark:border-gray-700/30 rounded-2xl px-4 py-2 shadow-lg">
            <BackgroundMusic showVolumeControl={false} />
            <AccessibilityToggle />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
