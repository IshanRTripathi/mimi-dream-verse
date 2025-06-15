
import { Card } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Mic, Palette, Users, Sparkles, Volume2, Camera } from "lucide-react";
import { useState } from "react";

const Features = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const features = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Custom Voice Cloning",
      description: "Record your voice once, and we'll create unlimited stories in your loving tone",
      demo: "🎙️ Try Voice Demo",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop&crop=faces",
      imageAlt: "Parent recording voice for personalized stories"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Your Child is the Hero",
      description: "Every story features your child as the main character in magical adventures",
      demo: "👑 Customize Character",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop&crop=faces",
      imageAlt: "Child as the hero in magical stories"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "AI-Generated Illustrations",
      description: "Beautiful, personalized artwork that brings each story to life",
      demo: "🎨 See Art Styles",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
      imageAlt: "AI-generated illustrations for stories"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Endless Story Variety",
      description: "New adventures every night with different themes, morals, and magical worlds",
      demo: "📚 Browse Stories",
      gradient: "from-green-500 to-teal-500",
      bgGradient: "from-green-50 to-teal-50",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop&crop=center",
      imageAlt: "Endless variety of magical stories"
    },
    {
      icon: <Volume2 className="w-8 h-8" />,
      title: "Interactive Audio",
      description: "Immersive sound effects and background music enhance the storytelling experience",
      demo: "🔊 Listen Preview",
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-50 to-purple-50",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center",
      imageAlt: "Interactive audio storytelling experience"
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Photo Integration",
      description: "Upload your child's photo to see them illustrated in their favorite stories",
      demo: "📸 Try Photo Magic",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=faces",
      imageAlt: "Photo integration for personalized characters"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Features That Make Magic ✨
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to create personalized, engaging bedtime stories that your children will treasure forever
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 bg-white dark:bg-gray-800 ${
                activeFeature === index ? 'ring-4 ring-purple-300 scale-105' : ''
              }`}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              {/* Feature Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 z-10"></div>
                <img 
                  src={feature.image}
                  alt={feature.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white shadow-lg z-20`}>
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                
                <GradientButton 
                  gradient={feature.gradient}
                  className="w-full"
                >
                  {feature.demo}
                </GradientButton>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
