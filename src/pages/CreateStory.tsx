import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Play, Pause, Mic, MicOff, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import BackgroundMusic from "@/components/BackgroundMusic";
import ConversationalAgent from "@/components/ConversationalAgent";

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
  const [currentStep, setCurrentStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [formData, setFormData] = useState({
    storyRequest: "",
    voiceRecorded: false,
    childName: "",
    childDescription: ""
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerateStory = () => {
    // Here you would implement the story generation logic
    console.log("Generating story with:", formData);
    // For now, just navigate back
    navigate('/');
  };

  const handleStoryRequest = (request: string) => {
    setFormData({...formData, storyRequest: request});
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="p-8 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">💭</div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Just tell Mimi what you want to listen to
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Talk directly to Mimi or type your story request
              </p>
            </div>

            {/* Toggle between AI conversation and manual input */}
            <div className="mb-6">
              <div className="flex justify-center mb-4">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-1 flex">
                  <Button
                    variant={formData.storyRequest ? "default" : "ghost"}
                    size="sm"
                    className="rounded-full px-4"
                    onClick={() => setFormData({...formData, storyRequest: ""})}
                  >
                    Talk to Mimi
                  </Button>
                  <Button
                    variant={!formData.storyRequest ? "default" : "ghost"}
                    size="sm"
                    className="rounded-full px-4"
                    onClick={() => {}}
                  >
                    Type Request
                  </Button>
                </div>
              </div>

              {!formData.storyRequest ? (
                <ConversationalAgent
                  onStoryRequest={handleStoryRequest}
                  animationData={defaultAnimationData}
                />
              ) : (
                <div className="space-y-4">
                  <Textarea
                    placeholder="Tell us about the story you'd like... (e.g., 'A magical adventure where my child discovers a hidden fairy garden and makes friends with talking animals')"
                    value={formData.storyRequest}
                    onChange={(e) => setFormData({...formData, storyRequest: e.target.value})}
                    className="min-h-32 text-base"
                  />
                  <Button
                    variant="outline"
                    onClick={() => setFormData({...formData, storyRequest: ""})}
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
          </Card>
        );

      case 2:
        return (
          <Card className="p-8 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎙️</div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Record your voice (Optional)
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Record a short sample to personalize the narration with your voice
              </p>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <Button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`w-24 h-24 rounded-full text-2xl ${
                    isRecording 
                      ? "bg-red-500 hover:bg-red-600 animate-pulse" 
                      : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  }`}
                >
                  {isRecording ? <MicOff /> : <Mic />}
                </Button>
                <p className="mt-4 text-lg font-medium">
                  {isRecording ? "Recording..." : "Tap to record"}
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Sample Text to Read:</h3>
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "Once upon a time, in a magical land far, far away, there lived a brave little child who loved adventures and discovering new worlds filled with wonder and excitement."
                </p>
              </div>

              {formData.voiceRecorded && (
                <div className="flex items-center justify-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? "Pause" : "Play"} Recording
                  </Button>
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    ✓ Voice recorded successfully!
                  </span>
                </div>
              )}

              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={() => setFormData({...formData, voiceRecorded: false})}
                  className="text-gray-500"
                >
                  Skip this step
                </Button>
              </div>
            </div>
          </Card>
        );

      case 3:
        return (
          <Card className="p-8 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">👑</div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Add your child avatar description (Optional)
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Describe your child's appearance to make them the story's hero
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Child's Name</label>
                <Input
                  placeholder="e.g., Emma, Alex, Sam..."
                  value={formData.childName}
                  onChange={(e) => setFormData({...formData, childName: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Appearance Description</label>
                <Textarea
                  placeholder="e.g., 'A 6-year-old with curly brown hair, bright green eyes, and a big smile. Loves wearing her favorite purple dress and sparkly shoes.'"
                  value={formData.childDescription}
                  onChange={(e) => setFormData({...formData, childDescription: e.target.value})}
                  className="min-h-24"
                />
              </div>

              <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  💡 <strong>Tip:</strong> Include details like hair color, eye color, favorite clothes, or special accessories to make the character truly unique!
                </p>
              </div>

              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={() => setFormData({...formData, childName: "", childDescription: ""})}
                  className="text-gray-500"
                >
                  Skip this step
                </Button>
              </div>
            </div>
          </Card>
        );

      case 4:
        return (
          <Card className="p-8 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">✨</div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                Listen and Enjoy
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Your personalized story is ready with custom narration and illustrations
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Story Summary:</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Theme:</strong> {formData.storyRequest || "General adventure story"}</p>
                  <p><strong>Voice:</strong> {formData.voiceRecorded ? "Your recorded voice" : "AI narrator"}</p>
                  <p><strong>Character:</strong> {formData.childName || "Your child"} {formData.childDescription ? "with custom appearance" : ""}</p>
                </div>
              </div>

              <div className="text-center">
                <Button
                  onClick={handleGenerateStory}
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold px-8 py-4 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  size="lg"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate My Story!
                </Button>
              </div>

              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                <p>⏱️ Your story will be ready in 3-5 minutes</p>
                <p>📧 We'll send you a notification when it's complete</p>
              </div>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 transition-colors duration-300">
      {/* Navigation Bar */}
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
            <BackgroundMusic showVolumeControl={false} />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Step {currentStep} of 4
              </span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {Math.round((currentStep / 4) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 max-w-2xl mx-auto">
            <Button
              onClick={handlePrev}
              variant="outline"
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            {currentStep < 4 && (
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStory;
