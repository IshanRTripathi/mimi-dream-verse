
import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Mother of 2",
      avatar: "👩‍💼",
      rating: 5,
      text: "My kids are absolutely obsessed! They ask for 'Mommy voice stories' every single night. The personalization is incredible - seeing Emma as a brave princess in her own adventures brings tears to my eyes.",
      highlight: "seeing Emma as a brave princess"
    },
    {
      name: "Michael Chen",
      role: "Working Dad",
      avatar: "👨‍💻", 
      rating: 5,
      text: "As a dad who travels frequently, StoryMimi helps me stay connected with bedtime routines. My son loves hearing stories in my voice even when I'm away. It's been a game-changer for our family.",
      highlight: "helps me stay connected"
    },
    {
      name: "Lisa Rodriguez",
      role: "Grandmother",
      avatar: "👵",
      rating: 5,
      text: "My grandchildren live across the country, but now I can tell them bedtime stories anytime! The app captured my voice perfectly, and they love seeing themselves in fairy tales. Pure magic!",
      highlight: "Pure magic!"
    },
    {
      name: "James Wilson",
      role: "Single Father",
      avatar: "👨‍👧",
      rating: 5,
      text: "Bedtime was always a struggle until we found StoryMimi. Now my daughter Sophie can't wait to hear what adventure she'll go on next. The stories are educational and entertaining!",
      highlight: "can't wait to hear what adventure"
    },
    {
      name: "Amy Foster",
      role: "Teacher & Mom",
      avatar: "👩‍🏫",
      rating: 5,
      text: "The educational value is outstanding! My kids learn about different cultures, problem-solving, and values through these personalized stories. It's entertainment and learning combined perfectly.",
      highlight: "entertainment and learning combined perfectly"
    },
    {
      name: "David Kim",
      role: "Tech Dad",
      avatar: "👨‍💻",
      rating: 5,
      text: "I was skeptical about AI-generated content, but the quality blew me away. The stories are creative, age-appropriate, and the voice cloning is incredibly natural. My twins are hooked!",
      highlight: "quality blew me away"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Loved by Families Everywhere 💝
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of parents creating magical bedtime memories with their children
          </p>
          <div className="flex justify-center items-center gap-2 mt-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-xl font-semibold text-gray-700 ml-2">4.9/5</span>
            <span className="text-gray-500">from 10,000+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-6 h-6 text-purple-300" />
                <p className="text-gray-600 leading-relaxed pl-4">
                  {testimonial.text}
                </p>
              </div>

              <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                <p className="text-sm font-medium text-purple-700">
                  "{testimonial.highlight}"
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-6 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">10,000+</div>
              <div className="text-sm text-gray-500">Happy Families</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">50,000+</div>
              <div className="text-sm text-gray-500">Stories Created</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">4.9/5</div>
              <div className="text-sm text-gray-500">App Store Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
