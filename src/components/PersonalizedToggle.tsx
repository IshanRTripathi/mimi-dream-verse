
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAudio } from '@/contexts/AudioContext';

const PersonalizedToggle = () => {
  const [isPersonalized, setIsPersonalized] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const { playStoryAudio } = useAudio();
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMode = () => {
    // Stop current audio when switching modes
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    setIsPersonalized(!isPersonalized);
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    // Stop any currently playing audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }

    if (!isPlaying) {
      if (isPersonalized) {
        // Play realistic tone for personalized mode
        currentAudioRef.current = new Audio('/src/assets/audio/realistictone.mp3');
      } else {
        // Play normal tone for normal mode
        currentAudioRef.current = new Audio('/src/assets/audio/normaltone.mp3');
      }

      if (currentAudioRef.current) {
        currentAudioRef.current.volume = 0.5;
        currentAudioRef.current.onended = () => {
          setIsPlaying(false);
          currentAudioRef.current = null;
        };
        currentAudioRef.current.play().catch(console.log);
      }
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-purple-100 dark:border-gray-700 w-full max-w-4xl mx-auto">
      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-center text-gray-800 dark:text-gray-200">
        🎭 Personalized Visual & Audio Assets
      </h3>
      
      {/* Toggle Buttons */}
      <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-1 sm:p-2 flex">
          <Button
            onClick={() => setIsPersonalized(true)}
            className={cn(
              "rounded-full px-3 sm:px-4 lg:px-6 py-1 sm:py-2 transition-all duration-300 text-sm sm:text-base",
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
              "rounded-full px-3 sm:px-4 lg:px-6 py-1 sm:py-2 transition-all duration-300 text-sm sm:text-base",
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
        {/* Image Section */}
        <div className="relative order-2 md:order-1">
          <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-2xl lg:rounded-3xl flex items-center justify-center overflow-hidden shadow-lg">
            {isPersonalized ? (
              <div className="text-center p-4 sm:p-6 lg:p-8">
                <div className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-2 sm:mb-4 flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl">
                  👸
                </div>
                <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">Emma's Adventure</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Custom character integrated</p>
              </div>
            ) : (
              <div className="text-center p-4 sm:p-6 lg:p-8">
                <div className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mx-auto mb-2 sm:mb-4 flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl">
                  🧚‍♀️
                </div>
                <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">Fairy Tale</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Generic story character</p>
              </div>
            )}
          </div>
          
          {/* Mode Label */}
          <div className={cn(
            "absolute -top-2 sm:-top-3 left-2 sm:left-4 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg",
            isPersonalized 
              ? "bg-gradient-to-r from-purple-500 to-pink-500" 
              : "bg-gradient-to-r from-blue-500 to-cyan-500"
          )}>
            {isPersonalized ? "Personalized" : "Normal"}
          </div>
        </div>

        {/* Audio Section */}
        <div className="space-y-4 sm:space-y-6 order-1 md:order-2">
          <div className="text-center">
            <h4 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              {isPersonalized ? "🎙️ Realistic Voice" : "🤖 Normal Tone"}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
              {isPersonalized 
                ? "Hear the story with realistic tone" 
                : "Standard AI-generated narration"
              }
            </p>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={toggleAudio}
              className={cn(
                "rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 shadow-lg transform hover:scale-105 transition-all duration-200",
                isPersonalized 
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" 
                  : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              )}
            >
              {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-1" />}
            </Button>
          </div>

          {/* Sample Text */}
          <div className={cn(
            "rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 text-center",
            isPersonalized 
              ? "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30" 
              : "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30"
          )}>
            <p className="text-xs sm:text-sm italic text-gray-700 dark:text-gray-300 leading-relaxed">
              {isPersonalized 
                ? `"Once upon a time, little Emma discovered a magical garden where butterflies danced and flowers sang beautiful melodies just for her..."` 
                : `"Once upon a time, there was a brave princess who discovered a magical garden where creatures of wonder awaited her arrival..."`
              }
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-1 sm:space-y-2">
            {isPersonalized ? (
              <>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></span>
                  Child's name integrated naturally
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-pink-400 rounded-full flex-shrink-0"></span>
                  Realistic voice tone technology
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></span>
                  Custom character appearance
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                  Generic story characters
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></span>
                  Standard AI narration
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
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
