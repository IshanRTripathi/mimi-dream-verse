
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Star, Sparkles } from "lucide-react";
import { loadWaitlistConfig } from "@/utils/configLoader";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal = ({ isOpen, onClose }: WaitlistModalProps) => {
  const [email, setEmail] = useState("");
  const [emailExtension, setEmailExtension] = useState("@gmail.com");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
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
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setEmail("");
    setEmailExtension("@gmail.com");
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
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {waitlistConfig.title}
            </DialogTitle>
            <p 
              className="text-gray-600 dark:text-gray-300 mt-2"
              dangerouslySetInnerHTML={{ __html: waitlistConfig.subtitle }}
            />
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <div className="flex gap-2">
              <Input
                type={emailExtension === "@custom" ? "email" : "text"}
                placeholder={emailExtension === "@custom" ? "your.email@domain.com" : "yourname"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <p className="text-xs text-gray-500 mt-1">
                Preview: {fullEmail || "yourname" + emailExtension}
              </p>
            )}
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              {waitlistConfig.earlyBirdPerks.title}
            </h4>
            <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
              {waitlistConfig.earlyBirdPerks.benefits.map((benefit, index) => (
                <li key={index}>• {benefit}</li>
              ))}
            </ul>
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
