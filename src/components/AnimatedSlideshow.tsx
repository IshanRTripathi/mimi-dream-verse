
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideData {
  title: string;
  description: string;
  icon: string;
  color: string;
  imagePlaceholder: string;
}

interface AnimatedSlideshowProps {
  slides: SlideData[];
}

const AnimatedSlideshow = ({ slides }: AnimatedSlideshowProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main Slide */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 shadow-2xl">
        <div className="relative h-96 md:h-[500px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 transform translate-x-0"
                  : index < currentSlide
                  ? "opacity-0 transform -translate-x-full"
                  : "opacity-0 transform translate-x-full"
              }`}
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Content Side */}
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                  <div className="text-4xl md:text-6xl mb-4">{slide.icon}</div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-white leading-tight">
                    {slide.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {slide.description}
                  </p>
                </div>

                {/* Image Side */}
                <div className="flex-1 relative">
                  <div className="absolute inset-4 md:inset-8">
                    <div className="relative h-full group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      <img 
                        src={slide.imagePlaceholder}
                        alt={`${slide.title}`}
                        className="relative w-full h-full object-cover rounded-2xl shadow-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <Button
          onClick={prevSlide}
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          onClick={nextSlide}
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Step Numbers */}
      <div className="flex justify-center mt-6 space-x-4">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
              index === currentSlide
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105"
                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnimatedSlideshow;
