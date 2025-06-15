
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

const PersonalizedToggle = () => {
  const [isPersonalized, setIsPersonalized] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMode = () => {
    setIsPersonalized(!isPersonalized);
    setIsPlaying(false); // Stop audio when switching modes
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // Here you would implement actual audio playback
    console.log(`${isPlaying ? 'Stopping' : 'Playing'} ${isPersonalized ? 'personalized' : 'normal'} audio`);
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-purple-100 dark:border-gray-700 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
        🎭 Personalized Visual & Audio Assets
      </h3>
      
      {/* Toggle Buttons */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2 flex">
          <Button
            onClick={() => setIsPersonalized(true)}
            className={cn(
              "rounded-full px-6 py-2 transition-all duration-300",
              isPersonalized 
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg" 
                : "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            )}
          >
            Personalized
          </Button>
          <Button
            onClick={() => setIsPersonalized(false)}
            className={cn(
              "rounded-full px-6 py-2 transition-all duration-300",
              !isPersonalized 
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg" 
                : "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            )}
          >
            Normal
          </Button>
        </div>
      </div>

      {/* Content Display */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-3xl flex items-center justify-center overflow-hidden shadow-lg">
            {isPersonalized ? (
              <div className="text-center p-8">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                  👸
                </div>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Emma's Adventure</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Custom character integrated</p>
              </div>
            ) : (
              <div className="text-center p-8">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                  🧚‍♀️
                </div>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Fairy Tale</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Generic story character</p>
              </div>
            )}
          </div>
          
          {/* Mode Label */}
          <div className={cn(
            "absolute -top-3 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg",
            isPersonalized 
              ? "bg-gradient-to-r from-purple-500 to-pink-500" 
              : "bg-gradient-to-r from-blue-500 to-cyan-500"
          )}>
            {isPersonalized ? "Personalized" : "Normal"}
          </div>
        </div>

        {/* Audio Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              {isPersonalized ? "🎙️ Mom's Voice" : "🤖 AI Narrator"}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {isPersonalized 
                ? "Hear the story in your own loving voice" 
                : "Professional AI-generated narration"
              }
            </p>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={toggleAudio}
              className={cn(
                "rounded-full w-16 h-16 shadow-lg transform hover:scale-105 transition-all duration-200",
                isPersonalized 
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" 
                  : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              )}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </Button>
          </div>

          {/* Sample Text */}
          <div className={cn(
            "rounded-2xl p-6 text-center",
            isPersonalized 
              ? "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30" 
              : "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30"
          )}>
            <p className="text-sm italic text-gray-700 dark:text-gray-300 leading-relaxed">
              {isPersonalized 
                ? `"Once upon a time, little Emma discovered a magical garden where butterflies danced and flowers sang beautiful melodies just for her..."` 
                : `"Once upon a time, there was a brave princess who discovered a magical garden where creatures of wonder awaited her arrival..."`
              }
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-2">
            {isPersonalized ? (
              <>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Child's name integrated naturally
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                  Parent's voice clone technology
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Custom character appearance
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Generic story characters
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  AI-generated narration
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Standard illustrations
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedToggle;
