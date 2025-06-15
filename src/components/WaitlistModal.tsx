
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Star, AlertCircle } from "lucide-react";
import { loadWaitlistConfig } from "@/utils/configLoader";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { waitlistService } from "@/services/waitlistService";
import WaitlistCounter from "./WaitlistCounter";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal = ({ isOpen, onClose }: WaitlistModalProps) => {
  const [email, setEmail] = useState("");
  const [emailExtension, setEmailExtension] = useState("@gmail.com");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const waitlistConfig = loadWaitlistConfig();

  const emailExtensions = [
    "@gmail.com",
    "@yahoo.com",
    "@hotmail.com",
    "@outlook.com",
    "@icloud.com",
    "@proton.me",
    "@custom"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError("");
    
    const fullEmail = emailExtension === "@custom" ? email : email + emailExtension;

    try {
      const result = await waitlistService.addSignup(fullEmail);
      
      if (result.alreadyExists) {
        setError("This email is already on our waitlist!");
        setIsLoading(false);
        return;
      }

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setEmail("");
    setEmailExtension("@gmail.com");
    setError("");
    onClose();
  };

  const fullEmail = emailExtension === "@custom" ? email : email + emailExtension;

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white fill-current" />
            </div>
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              {waitlistConfig.successMessage.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {waitlistConfig.successMessage.subtitle}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {waitlistConfig.successMessage.details}
            </p>
            
            {/* Show updated counter */}
            <div className="mb-6">
              <WaitlistCounter variant="compact" className="justify-center" />
            </div>
            
            <Button onClick={handleClose} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
              Got it!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="text-center mb-4">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {waitlistConfig.title}
            </DialogTitle>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              <strong className="text-purple-600 dark:text-purple-400">Good things</strong> come to those who <strong className="text-purple-600 dark:text-purple-400">wait</strong>! ✨
            </p>
            
            {/* Show current waitlist count */}
            <div className="mt-4">
              <WaitlistCounter variant="badge" />
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  {waitlistConfig.earlyBirdPerks.title}
                </h4>
                <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                  {waitlistConfig.earlyBirdPerks.benefits.map((benefit, index) => (
                    <li key={index}>• {benefit}</li>
                  ))}
                </ul>
              </div>
              <div className="w-full sm:w-36 h-36 flex items-center justify-center flex-shrink-0">
                <DotLottieReact
                  src="/assets/waitlist-animation.json"
                  loop
                  autoplay
                  className="w-36 h-36 object-contain"
                  style={{ imageRendering: 'crisp-edges' }}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email Address</label>
            <div className="flex gap-2">
              <Input
                type={emailExtension === "@custom" ? "email" : "text"}
                placeholder={emailExtension === "@custom" ? "your.email@domain.com" : "yourname"}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(""); // Clear error when user types
                }}
                className="flex-1"
                required
              />
              {emailExtension !== "@custom" && (
                <Select value={emailExtension} onValueChange={setEmailExtension}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {emailExtensions.map((ext) => (
                      <SelectItem key={ext} value={ext}>
                        {ext === "@custom" ? "Custom" : ext}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            {emailExtension !== "@custom" && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Preview: {fullEmail || "yourname" + emailExtension}
              </p>
            )}
            
            {error && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm mt-2">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            disabled={isLoading || !email}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Joining...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Join the Waitlist
              </div>
            )}
          </Button>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            No spam, ever. Unsubscribe anytime. 🔒
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;
