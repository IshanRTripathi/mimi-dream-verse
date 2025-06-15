
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  // Base theme description for consistent styling across all images
  const baseTheme = "Pixar-style 3D rendered image with vibrant colors, soft lighting, cartoon-like characters with exaggerated friendly features, warm and inviting atmosphere, high-quality digital art with smooth textures, playful and magical ambiance suitable for children's content";

  const steps = [
    {
      step: "1",
      title: "Record Your Voice",
      description: "Simply read a short sample text to capture your unique voice",
      icon: "🎙️",
      color: "from-blue-500 to-cyan-500",
      imagePrompt: `${baseTheme}. Scene: A loving parent (mid-30s, warm smile) sitting comfortably in a cozy living room, holding a smartphone close to their mouth while reading from a children's book. Soft evening lighting through a window, bookshelves in background, the phone screen showing a recording interface with sound waves. The parent looks engaged and happy, wearing casual home clothes. Colors: warm blues and soft yellows.`,
      imagePlaceholder: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop&crop=faces"
    },
    {
      step: "2", 
      title: "Create Your Child's Character",
      description: "Upload a photo and customize their appearance in the stories",
      icon: "👑",
      color: "from-purple-500 to-pink-500",
      imagePrompt: `${baseTheme}. Scene: A magical transformation showcase featuring 4-5 diverse 3D animated child characters (ages 4-8) in a floating carousel arrangement. Each character has unique features - different ethnicities, hair colors, and clothing styles (princess dress, superhero cape, wizard hat, explorer outfit). Sparkles and magical particles surround them. Background shows a dreamy cloud environment with rainbow gradients. Colors: vibrant purples, pinks, and golden sparkles.`,
      imagePlaceholder: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop&crop=faces"
    },
    {
      step: "3",
      title: "Choose Story Themes",
      description: "Pick from adventures, fairy tales, educational stories, and more",
      icon: "📚",
      color: "from-orange-500 to-red-500",
      imagePrompt: `${baseTheme}. Scene: A magical library with floating books opening to reveal miniature 3D scenes inside each book - a pirate ship on ocean waves, a fairy tale castle with dragons, a space rocket among stars, and a jungle with friendly animals. Books are arranged in a semi-circle with glowing effects. A cute owl librarian with glasses sits on a stack of books pointing with a wand. Colors: warm oranges, reds, and golden magical glows.`,
      imagePlaceholder: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center"
    },
    {
      step: "4",
      title: "Listen & Enjoy",
      description: "Your personalized story is ready with your voice and custom illustrations",
      icon: "✨",
      color: "from-green-500 to-teal-500",
      imagePrompt: `${baseTheme}. Scene: A heartwarming bedtime scene with a parent and child cuddled together in a cozy bed, both looking peaceful and happy. The child (personalized character from step 2) is snuggled against the parent while magical story elements float around them - gentle fairy lights, floating storybook characters, and dreamy clouds. A smartphone on the nightstand glows softly, indicating the story is playing. Soft moonlight through curtains. Colors: soothing greens, teals, and warm amber lighting.`,
      imagePlaceholder: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop&crop=center"
    }
  ];

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

        <div className="max-w-6xl mx-auto space-y-8 md:space-y-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-6 md:gap-8`}>
                {/* Step Card */}
                <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md xl:max-w-lg">
                  <Card className="p-4 md:p-6 shadow-xl border-0 bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-lg md:text-2xl font-bold mb-3 md:mb-4 shadow-lg`}>
                      {step.step}
                    </div>
                    <div className="text-2xl md:text-4xl mb-2 md:mb-3">{step.icon}</div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-800 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </Card>
                </div>

                {/* Visual Image */}
                <div className="flex-1 w-full max-w-sm md:max-w-md lg:max-w-lg">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                    <img 
                      src={step.imagePlaceholder}
                      alt={`Step ${step.step}: ${step.title}`}
                      className="relative w-full h-48 md:h-64 lg:h-80 object-cover rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 md:px-3 py-1">
                      <span className="text-xs md:text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Step {step.step}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection Line for Mobile */}
              {index < steps.length - 1 && (
                <div className="flex justify-center mt-6 md:mt-8 lg:hidden">
                  <div className="w-px h-8 md:h-12 bg-gradient-to-b from-purple-300 to-pink-300"></div>
                </div>
              )}
            </div>
          ))}
        </div>

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
