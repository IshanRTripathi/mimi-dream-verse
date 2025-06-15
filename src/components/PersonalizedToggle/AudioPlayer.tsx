
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { loadAudioConfig } from '@/utils/configLoader';

interface AudioPlayerProps {
  audioType: 'normal' | 'personalized';
  title: string;
  description: string;
  sampleText: string;
  gradientColors: string;
  buttonGradient: string;
  shouldStop?: boolean;
  onAudioStateChange?: (isPlaying: boolean) => void;
}

export const AudioPlayer = ({ 
  audioType, 
  title, 
  description, 
  sampleText, 
  gradientColors,
  buttonGradient,
  shouldStop = false,
  onAudioStateChange
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioConfig = loadAudioConfig();

  // Stop audio when shouldStop prop changes to true
  useEffect(() => {
    if (shouldStop && currentAudioRef.current) {
      stopCurrentAudio();
    }
  }, [shouldStop]);

  const stopCurrentAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
      setIsPlaying(false);
      onAudioStateChange?.(false);
      console.log('🎵 Audio stopped due to tab switch');
    }
  };

  const toggleAudio = () => {
    if (currentAudioRef.current) {
      stopCurrentAudio();
      return;
    }

    // Use audio paths from the audio folder
    const audioPaths = audioType === 'personalized' 
      ? ['/src/assets/audio/realistictone.mp3', '/realistictone.mp3']
      : ['/src/assets/audio/normaltone.mp3', '/normaltone.mp3'];

    console.log('Attempting to load audio for type:', audioType);
    console.log('Audio paths to try:', audioPaths);

    let audioLoaded = false;
    let currentPathIndex = 0;

    const tryLoadAudio = () => {
      if (currentPathIndex >= audioPaths.length) {
        console.error('❌ All audio paths failed to load:', audioPaths);
        setIsPlaying(false);
        currentAudioRef.current = null;
        onAudioStateChange?.(false);
        return;
      }

      const currentPath = audioPaths[currentPathIndex];
      console.log('🎵 Trying to load audio from:', currentPath);
      
      const audio = new Audio(currentPath);
      // Use the narration volume level from config
      audio.volume = audioConfig.volume_levels.narration;
      
      audio.oncanplaythrough = () => {
        if (!audioLoaded) {
          audioLoaded = true;
          console.log('✅ Audio loaded successfully from:', currentPath);
          console.log('🔊 Audio volume set to:', audio.volume);
          currentAudioRef.current = audio;
          audio.play().then(() => {
            setIsPlaying(true);
            onAudioStateChange?.(true);
            console.log('🎵 Audio playing');
          }).catch(error => {
            console.error('❌ Audio play failed:', error);
            setIsPlaying(false);
            currentAudioRef.current = null;
            onAudioStateChange?.(false);
          });
        }
      };

      audio.onended = () => {
        console.log('🎵 Audio ended');
        setIsPlaying(false);
        currentAudioRef.current = null;
        onAudioStateChange?.(false);
      };

      audio.onerror = (error) => {
        console.log('❌ Failed to load audio from:', currentPath, error);
        currentPathIndex++;
        tryLoadAudio();
      };

      audio.load();
    };

    tryLoadAudio();
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h4 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
          {title}
        </h4>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={toggleAudio}
          className={`rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 shadow-lg transform hover:scale-105 transition-all duration-200 ${buttonGradient}`}
        >
          {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-1" />}
        </Button>
      </div>

      <div className={`rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 text-center ${gradientColors}`}>
        <p className="text-xs sm:text-sm italic text-gray-700 dark:text-gray-300 leading-relaxed">
          "{sampleText}"
        </p>
      </div>
    </div>
  );
};
