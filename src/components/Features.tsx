
import { Card } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Mic, Palette, Users, Sparkles, Volume2, Camera } from "lucide-react";
import { useState } from "react";
import { loadFeatures, type FeatureConfig } from "@/utils/configLoader";

const Features = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const features = loadFeatures();

  const getIconComponent = (iconName: string) => {
    const iconMap = {
      Mic: <Mic className="w-8 h-8" />,
      Users: <Users className="w-8 h-8" />,
      Palette: <Palette className="w-8 h-8" />,
      Sparkles: <Sparkles className="w-8 h-8" />,
      Volume2: <Volume2 className="w-8 h-8" />,
      Camera: <Camera className="w-8 h-8" />
    };
    return iconMap[iconName as keyof typeof iconMap] || <Sparkles className="w-8 h-8" />;
  };

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
                  {getIconComponent(feature.icon)}
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
