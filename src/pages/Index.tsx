
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/30 dark:to-gray-800 transition-all duration-500">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-2 sm:p-4 md:p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo/Brand - Left Side */}
          <div className="flex items-center">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 rounded-xl sm:rounded-2xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 shadow-soft hover:shadow-medium transition-all duration-300">
              <h1 className="text-base sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-rounded">
                StoryMimi ✨
              </h1>
            </div>
          </div>
          
          {/* Controls - Right Side */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 rounded-xl sm:rounded-2xl px-2 sm:px-3 lg:px-4 py-1 sm:py-2 shadow-soft hover:shadow-medium transition-all duration-300">
            <BackgroundMusic showVolumeControl={false} />
            <AccessibilityToggle />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content with better spacing */}
      <main className="relative pt-16 sm:pt-20 md:pt-24">
        <Hero />
        <Features />
        <HowItWorks />
        {/* <Testimonials /> */}
        <Pricing />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
