
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

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
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            How StoryMimi Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Creating magical personalized stories is as easy as 1-2-3-4! 
            Get your first story ready in just minutes.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative mb-16 last:mb-0">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Step Card */}
                <Card className="flex-shrink-0 w-full lg:w-96 p-6 shadow-xl border-0 bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg`}>
                    {step.step}
                  </div>
                  <div className="text-4xl mb-3">{step.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Image Prompt for Developers */}
                  <details className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <summary className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-purple-600">
                      🎨 Image Generation Prompt
                    </summary>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                      {step.imagePrompt}
                    </p>
                  </details>
                </Card>

                {/* Visual Image */}
                <div className="flex-1 max-w-md lg:max-w-lg">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                    <img 
                      src={step.imagePlaceholder}
                      alt={`Step ${step.step}: ${step.title}`}
                      className="relative w-full h-64 lg:h-80 object-cover rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Step {step.step}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow for Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center">
                    <ArrowRight className="w-8 h-8 text-purple-400 transform rotate-90 lg:rotate-0" />
                  </div>
                )}
              </div>

              {/* Arrow for Mobile */}
              {index < steps.length - 1 && (
                <div className="flex lg:hidden justify-center mt-8">
                  <div className="w-px h-12 bg-gradient-to-b from-purple-300 to-pink-300"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Base Theme Reference for Developers */}
        <div className="mt-16 max-w-4xl mx-auto">
          <details className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
            <summary className="text-lg font-bold text-gray-800 dark:text-white cursor-pointer hover:text-purple-600 mb-4">
              🎨 Consistent Theme Guidelines for Image Generation
            </summary>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <p><strong>Base Theme:</strong> {baseTheme}</p>
              <div>
                <strong>Key Visual Elements:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Pixar-style 3D rendering with soft, rounded features</li>
                  <li>Vibrant, saturated colors with warm lighting</li>
                  <li>Cartoon-like characters with exaggerated friendly expressions</li>
                  <li>Magical elements like sparkles, glowing effects, and floating objects</li>
                  <li>Child-friendly environments with cozy, safe atmospheres</li>
                  <li>High-quality digital art with smooth textures</li>
                  <li>Consistent color palette across all images</li>
                </ul>
              </div>
            </div>
          </details>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              ⏱️ Ready in Minutes!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Your first personalized story will be ready in just 3-5 minutes. 
              Perfect for tonight's bedtime!
            </p>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>🚀 Instant Generation</span>
              <span>•</span>
              <span>🎯 100% Personalized</span>
              <span>•</span>
              <span>❤️ Made with Love</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
