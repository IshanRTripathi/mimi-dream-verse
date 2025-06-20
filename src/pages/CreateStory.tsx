import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import ConversationalAgent from "@/components/ConversationalAgent";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Default Lottie animation data (you can replace this with actual JSON file)
const defaultAnimationData = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 120,
  w: 200,
  h: 200,
  nm: "AI Agent",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 0, s: [0] }, { t: 120, s: [360] }] },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [80, 80] },
              p: { a: 0, k: [0, 0] },
              nm: "Ellipse Path 1",
              mn: "ADBE Vector Shape - Ellipse"
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.6, 0.4, 1, 1] },
              o: { a: 0, k: 100 },
              r: 1,
              bm: 0,
              nm: "Fill 1",
              mn: "ADBE Vector Graphic - Fill"
            }
          ],
          nm: "Ellipse 1",
          np: 2,
          cix: 2,
          bm: 0,
          ix: 1,
          mn: "ADBE Vector Group"
        }
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0
    }
  ]
};

const CreateStory = () => {
  const navigate = useNavigate();
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
  const [storyRequest, setStoryRequest] = useState("");
  const [isBetaDialogOpen, setIsBetaDialogOpen] = useState(false);
  
  const handleStoryRequest = (request: string) => {
    setStoryRequest(request);
  };

  const handleGenerateStory = () => {
    console.log("Opening beta program dialog");
    setIsBetaDialogOpen(true);
  };
  
  const handleCloseBetaDialog = () => {
    setIsBetaDialogOpen(false);
  };
  
  const handleJoinBeta = () => {
    window.open('https://forms.gle/KAvX7ZB3KcgSZtBU7', '_blank');
  };

  const renderContent = () => {
    return (
      <Card className="p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">💭</div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Just tell Mimi what kind of story you want to listen to
          </h2>
        </div>

        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-1 flex">
              <Button
                variant={inputMode === 'voice' ? "default" : "ghost"}
                size="sm"
                className="rounded-full px-4"
                onClick={() => setInputMode('voice')}
              >
                Talk to Mimi
              </Button>
              <Button
                variant={inputMode === 'text' ? "default" : "ghost"}
                size="sm"
                className="rounded-full px-4"
                onClick={() => setInputMode('text')}
              >
                Type Request
              </Button>
            </div>
          </div>

          {inputMode === 'voice' ? (
            <ConversationalAgent onStoryRequest={handleStoryRequest} />
          ) : (
            <div className="space-y-4">
              <Textarea
                placeholder="Tell us about the story you'd like... (e.g., 'A magical adventure where my child discovers a hidden fairy garden and makes friends with talking animals')"
                value={storyRequest}
                onChange={(e) => setStoryRequest(e.target.value)}
                className="min-h-32 text-base"
              />
              <Button
                variant="outline"
                onClick={() => setInputMode('voice')}
                className="w-full"
              >
                Switch to Voice Input
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            💡 <strong>Tip:</strong> Be as creative as you want! Mention specific themes, settings, or lessons you'd like included.
          </p>
        </div>

        <div className="text-center mt-8">
          <Button
            onClick={handleGenerateStory}
            className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold px-8 py-4 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            size="lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Generate My Story!
          </Button>
        </div>
      </Card>
    );
  };
  
  const renderBetaDialog = () => {
    return (
      <Dialog open={isBetaDialogOpen} onOpenChange={handleCloseBetaDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Join Our Beta Program
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-6 text-center">
            <div className="text-6xl mb-4 mx-auto">✨</div>
            <h3 className="text-xl font-bold mb-4">
              StoryMimi is currently in beta
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're excited to have you join our founding family! Fill out a quick form to get early access to StoryMimi.
            </p>
            
            <Button 
              onClick={handleJoinBeta}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 w-full"
            >
              Join Beta Program
            </Button>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              Limited spots available. Be among the first to experience personalized AI bedtime stories!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 transition-colors duration-300">
      <nav className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Create Your Story ✨
            </h1>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {renderContent()}
          {renderBetaDialog()}
        </div>
      </div>
    </div>
  );
};

export default CreateStory;