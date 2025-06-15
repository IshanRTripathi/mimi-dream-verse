
import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { loadTestimonials } from "@/utils/configLoader";
import { useEffect, useRef } from "react";

const Testimonials = () => {
  const testimonials = loadTestimonials();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;

    if (scrollWidth <= clientWidth) return;

    let scrollPosition = 0;
    const scrollSpeed = 1; // pixels per frame
    
    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      if (scrollPosition >= scrollWidth - clientWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
    };

    const intervalId = setInterval(scroll, 50); // 50ms interval for smooth scrolling

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Loved by Families Everywhere 💝
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of parents creating magical bedtime memories with their children
          </p>
          <div className="flex justify-center items-center gap-2 mt-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-xl font-semibold text-gray-700 dark:text-gray-300 ml-2">4.9/5</span>
            <span className="text-gray-500 dark:text-gray-400">from 10,000+ reviews</span>
          </div>
        </div>

        {/* Auto-scrolling testimonials */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden mb-12"
          style={{ scrollBehavior: 'auto' }}
        >
          {testimonials.concat(testimonials).map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm min-w-[320px] flex-shrink-0"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-6 h-6 text-purple-300" />
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-4 text-sm">
                  {testimonial.text}
                </p>
              </div>

              <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-lg">
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  "{testimonial.highlight}"
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">10,000+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Happy Families</div>
            </div>
            <div className="w-px h-12 bg-gray-200 dark:bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">50,000+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Stories Created</div>
            </div>
            <div className="w-px h-12 bg-gray-200 dark:bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">4.9/5</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">App Store Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
