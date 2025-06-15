
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

const PersonalizedToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('normal');
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const stopCurrentAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
      setIsPlaying(false);
    }
  };

  const toggleAudio = (audioType: 'normal' | 'personalized') => {
    // Stop current audio if playing
    if (currentAudioRef.current) {
      stopCurrentAudio();
      return;
    }

    // Try multiple possible paths for the audio files
    const audioPaths = audioType === 'personalized' 
      ? [
          '/src/assets/audio/realistictone.mp3',
          '/src/assets/realistictone.mp3',
          '/assets/audio/realistictone.mp3',
          '/assets/realistictone.mp3',
          './src/assets/audio/realistictone.mp3',
          './src/assets/realistictone.mp3'
        ]
      : [
          '/src/assets/audio/normaltone.mp3',
          '/src/assets/normaltone.mp3',
          '/assets/audio/normaltone.mp3',
          '/assets/normaltone.mp3',
          './src/assets/audio/normaltone.mp3',
          './src/assets/normaltone.mp3'
        ];

    let audioLoaded = false;
    let currentPathIndex = 0;

    const tryLoadAudio = () => {
      if (currentPathIndex >= audioPaths.length) {
        console.error('All audio paths failed to load:', audioPaths);
        setIsPlaying(false);
        currentAudioRef.current = null;
        return;
      }

      const currentPath = audioPaths[currentPathIndex];
      console.log('Trying to load audio from:', currentPath);
      
      const audio = new Audio(currentPath);
      audio.volume = 0.7;
      
      audio.oncanplaythrough = () => {
        if (!audioLoaded) {
          audioLoaded = true;
          console.log('Audio loaded successfully from:', currentPath);
          currentAudioRef.current = audio;
          audio.play().then(() => {
            setIsPlaying(true);
          }).catch(error => {
            console.error('Audio play failed:', error);
            setIsPlaying(false);
            currentAudioRef.current = null;
          });
        }
      };

      audio.onended = () => {
        setIsPlaying(false);
        currentAudioRef.current = null;
      };

      audio.onerror = (error) => {
        console.log('Failed to load audio from:', currentPath, error);
        currentPathIndex++;
        tryLoadAudio();
      };

      // Start loading the audio
      audio.load();
    };

    tryLoadAudio();
  };

  const handleTabChange = (value: string) => {
    stopCurrentAudio();
    setActiveTab(value);
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-purple-100 dark:border-gray-700 w-full max-w-4xl mx-auto">
      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-center text-gray-800 dark:text-gray-200">
        🎭 Personalized Visual & Audio Assets
      </h3>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger 
            value="normal"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
          >
            Normal
          </TabsTrigger>
          <TabsTrigger 
            value="personalized"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
          >
            Personalized
          </TabsTrigger>
        </TabsList>

        <TabsContent value="normal" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
            {/* Image Section */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50 rounded-2xl lg:rounded-3xl flex items-center justify-center overflow-hidden shadow-lg">
                <img 
                  src="/src/assets/featureImages/normalasset.jpg" 
                  alt="Normal story asset"
                  className="w-full h-full object-cover rounded-2xl lg:rounded-3xl"
                />
              </div>
              
              <div className="absolute -top-2 sm:-top-3 left-2 sm:left-4 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                Normal
              </div>
            </div>

            {/* Audio Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h4 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  🤖 Normal Tone
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                  Standard AI-generated narration
                </p>
              </div>

              {/* Audio Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  onClick={() => toggleAudio('normal')}
                  className="rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 shadow-lg transform hover:scale-105 transition-all duration-200 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-1" />}
                </Button>
              </div>

              {/* Sample Text */}
              <div className="rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 text-center bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30">
                <p className="text-xs sm:text-sm italic text-gray-700 dark:text-gray-300 leading-relaxed">
                  "Once upon a time, there was a brave princess who discovered a magical garden where creatures of wonder awaited her arrival..."
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-1 sm:space-y-2">
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
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="personalized" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
            {/* Image Section */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-2xl lg:rounded-3xl flex items-center justify-center overflow-hidden shadow-lg">
                <img 
                  src="/src/assets/featureImages/personalisedasset.jpg" 
                  alt="Personalized story asset"
                  className="w-full h-full object-cover rounded-2xl lg:rounded-3xl"
                />
              </div>
              
              <div className="absolute -top-2 sm:-top-3 left-2 sm:left-4 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg bg-gradient-to-r from-purple-500 to-pink-500">
                Personalized
              </div>
            </div>

            {/* Audio Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h4 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  🎙️ Realistic Voice
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                  Hear the story with realistic tone
                </p>
              </div>

              {/* Audio Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  onClick={() => toggleAudio('personalized')}
                  className="rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 shadow-lg transform hover:scale-105 transition-all duration-200 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-1" />}
                </Button>
              </div>

              {/* Sample Text */}
              <div className="rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 text-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30">
                <p className="text-xs sm:text-sm italic text-gray-700 dark:text-gray-300 leading-relaxed">
                  "Once upon a time, little Emma discovered a magical garden where butterflies danced and flowers sang beautiful melodies just for her..."
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-1 sm:space-y-2">
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
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersonalizedToggle;
