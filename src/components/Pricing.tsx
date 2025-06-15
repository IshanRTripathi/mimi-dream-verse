

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Check, Star, Crown, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import WaitlistModal from "./WaitlistModal";
import Lottie from "lottie-react";
import arrowAnimation from "@/assets/arrow-animation.json";

const Pricing = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const plans = [
    {
      name: "Free Trial",
      price: "Free",
      period: "7 days",
      description: "Perfect for trying out StoryMimi",
      features: [
        "3 personalized stories",
        "Basic voice cloning",
        "Standard illustrations",
        "1 character profile",
        "Email support"
      ],
      buttonText: "Start Free Trial",
      buttonStyle: "border-2 border-purple-300/50 text-purple-600 hover:bg-purple-50/80 bg-white/10 backdrop-blur-md shadow-md",
      popular: false,
      icon: <Star className="w-6 h-6" />
    },
    {
      name: "Family Plan",
      price: "$9.99",
      period: "month",
      description: "Best for regular bedtime storytelling",
      features: [
        "Unlimited stories",
        "Premium voice cloning",
        "HD illustrations",
        "Up to 3 character profiles",
        "Multiple voice recordings",
        "Educational story themes",
        "Priority support",
        "Offline listening"
      ],
      buttonText: "Start Family Plan",
      buttonStyle: "bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-700/80 hover:to-pink-700/80 text-white backdrop-blur-md border border-white/20 shadow-md",
      popular: true,
      icon: <Crown className="w-6 h-6" />
    },
    {
      name: "Premium",
      price: "$19.99",
      period: "month",
      description: "For families who love unlimited magic",
      features: [
        "Everything in Family Plan",
        "Custom story lengths",
        "Advanced photo integration",
        "Multiple art styles",
        "Background music library",
        "Story sharing with family",
        "Early access to new features",
        "1-on-1 onboarding call"
      ],
      buttonText: "Go Premium",
      buttonStyle: "bg-gradient-to-r from-orange-500/80 to-red-500/80 hover:from-orange-600/80 hover:to-red-600/80 text-white backdrop-blur-md border border-white/20 shadow-md",
      popular: false,
      icon: <Sparkles className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Choose Your Story Plan ✨
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start your magical journey with a free trial, then choose the plan that fits your family's storytelling needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative p-8 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                plan.popular 
                  ? 'ring-4 ring-purple-300 transform scale-105 bg-gradient-to-b from-purple-50 to-pink-50' 
                  : 'hover:-translate-y-2 bg-white'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    🌟 Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600'
                } shadow-lg`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-800">${plan.price === 'Free' ? '0' : plan.price.replace('$', '')}</span>
                  {plan.price !== 'Free' && <span className="text-gray-500">/{plan.period}</span>}
                  {plan.price === 'Free' && <span className="text-gray-500"> for {plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => setIsWaitlistOpen(true)}
                className={`w-full py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 max-w-3xl mx-auto border-2 border-purple-200">
            <h3 className="text-3xl font-bold mb-4 text-gray-800">
              🎁 Limited Time: Early Bird Special!
            </h3>
            <p className="text-lg text-gray-700 mb-6 font-medium">
              Join our waitlist now and get <span className="text-purple-600 font-bold text-xl">75% OFF</span> your first 6 months when we launch! 
              Plus exclusive beta access and premium features absolutely FREE.
            </p>
            <div className="flex items-center justify-center gap-4 mb-6">
              {/* Left Arrow */}
              <div className="w-8 h-8 md:w-12 md:h-12 opacity-60">
                <Lottie 
                  animationData={arrowAnimation} 
                  loop={true}
                  className="w-full h-full"
                />
              </div>
              
              <MagneticButton
                onClick={() => setIsWaitlistOpen(true)}
                className="bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-700/80 hover:to-pink-700/80 text-white font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 backdrop-blur-md border border-white/20 flex items-center gap-2"
              >
                <Star className="w-5 h-5 fill-current" />
                Claim My Early Bird Discount!
              </MagneticButton>
              
              {/* Right Arrow */}
              <div className="w-8 h-8 md:w-12 md:h-12 opacity-60 scale-x-[-1]">
                <Lottie 
                  animationData={arrowAnimation} 
                  loop={true}
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
              <span>✅ 30-day money-back guarantee</span>
              <span>•</span>
              <span>🔒 Cancel anytime</span>
              <span>•</span>
              <span>📱 iOS & Android included</span>
              <span>•</span>
              <span>⚡ Limited spots available</span>
            </div>
          </div>
        </div>
      </div>
      
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </section>
  );
};

export default Pricing;

