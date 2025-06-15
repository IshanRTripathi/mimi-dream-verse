
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import WaitlistModal from "./WaitlistModal";
import WaitlistCounter from "./WaitlistCounter";

const Footer = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              StoryMimi ✨
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Creating magical, personalized bedtime stories that bring families closer together, one tale at a time.
            </p>
            <div className="flex items-center gap-2 text-pink-400 mb-4">
              <Heart className="w-4 h-4 fill-current" />
              <span className="text-sm">Made with love for families</span>
            </div>
            
            {/* Waitlist Counter in Footer */}
            <WaitlistCounter variant="compact" showRecent={false} />
          </div>

          {/* Product */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Free Trial</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Voice Samples</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Parent Guide</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Safety & Privacy</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-4 h-4 text-purple-400" />
                <span className="text-sm">hello@storymimi.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-4 h-4 text-purple-400" />
                <span className="text-sm">1-800-STORIES</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold mb-2">Get Notified When We Launch</h5>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setIsWaitlistOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg px-4 py-2 text-center text-sm font-medium cursor-pointer hover:from-purple-700 hover:to-pink-700 transition-colors"
                >
                  📱 Join Waitlist for iOS
                </button>
                <button
                  onClick={() => setIsWaitlistOpen(true)}
                  className="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg px-4 py-2 text-center text-sm font-medium cursor-pointer hover:from-green-700 hover:to-teal-700 transition-colors"
                >
                  🤖 Join Waitlist for Android
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400 mb-4">
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-purple-400 transition-colors">Cookie Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-purple-400 transition-colors">COPPA Compliance</a>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 StoryMimi. All rights reserved. Creating magical memories since 2024. ✨
          </p>
        </div>
      </div>
      
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </footer>
  );
};

export default Footer;
