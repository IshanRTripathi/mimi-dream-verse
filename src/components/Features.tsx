
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Your Child is the Hero",
      description: "Every story features your child as the main character in magical adventures",
      demo: "👑 Customize Character",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "AI-Generated Illustrations",
      description: "Beautiful, personalized artwork that brings each story to life",
      demo: "🎨 See Art Styles",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Endless Story Variety",
      description: "New adventures every night with different themes, morals, and magical worlds",
      demo: "📚 Browse Stories",
      gradient: "from-green-500 to-teal-500",
      bgGradient: "from-green-50 to-teal-50"
    },
    {
      icon: <Volume2 className="w-8 h-8" />,
      title: "Interactive Audio",
      description: "Immersive sound effects and background music enhance the storytelling experience",
      demo: "🔊 Listen Preview",
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-50 to-purple-50"
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Photo Integration",
      description: "Upload your child's photo to see them illustrated in their favorite stories",
      demo: "📸 Try Photo Magic",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Features That Make Magic ✨
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to create personalized, engaging bedtime stories that your children will treasure forever
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`p-6 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 bg-gradient-to-br ${feature.bgGradient} ${
                activeFeature === index ? 'ring-4 ring-purple-300 scale-105' : ''
              }`}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white mb-4 shadow-lg`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {feature.description}
              </p>
              
              <Button 
                variant="outline" 
                className={`w-full border-2 hover:scale-105 transition-all duration-200 ${
                  activeFeature === index 
                    ? `bg-gradient-to-r ${feature.gradient} text-white border-transparent` 
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                {feature.demo}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
