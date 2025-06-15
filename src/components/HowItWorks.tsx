
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: "1",
      title: "Record Your Voice",
      description: "Simply read a short sample text to capture your unique voice",
      icon: "🎙️",
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: "2", 
      title: "Create Your Child's Character",
      description: "Upload a photo and customize their appearance in the stories",
      icon: "👑",
      color: "from-purple-500 to-pink-500"
    },
    {
      step: "3",
      title: "Choose Story Themes",
      description: "Pick from adventures, fairy tales, educational stories, and more",
      icon: "📚",
      color: "from-orange-500 to-red-500"
    },
    {
      step: "4",
      title: "Listen & Enjoy",
      description: "Your personalized story is ready with your voice and custom illustrations",
      icon: "✨",
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            How StoryMimi Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Creating magical personalized stories is as easy as 1-2-3-4! 
            Get your first story ready in just minutes.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <Card className="flex-shrink-0 w-full md:w-80 p-6 shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow duration-300">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg`}>
                    {step.step}
                  </div>
                  <div className="text-4xl mb-3">{step.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </Card>

                {index < steps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center flex-1">
                    <ArrowRight className="w-8 h-8 text-purple-400" />
                  </div>
                )}
              </div>

              {/* Mobile Arrow */}
              {index < steps.length - 1 && (
                <div className="flex md:hidden justify-center mb-8">
                  <div className="w-px h-12 bg-gradient-to-b from-purple-300 to-pink-300"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              ⏱️ Ready in Minutes!
            </h3>
            <p className="text-gray-600 mb-6">
              Your first personalized story will be ready in just 3-5 minutes. 
              Perfect for tonight's bedtime!
            </p>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
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
