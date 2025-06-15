
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
      setIsPlaying(false);
      setIsLoading(false);
      onAudioStateChange?.(false);
      console.log('🎵 Audio stopped');
    }
  };

  const toggleAudio = async () => {
    if (currentAudioRef.current) {
      stopCurrentAudio();
      return;
    }

    // Clear any previous errors
    setError(null);
    setIsLoading(true);

    // Determine the correct audio path
    const audioPath = audioType === 'personalized' 
      ? audioConfig.story_audio.personalized.mom_voice
      : audioConfig.story_audio.ai_narrator.default;

    console.log('🎵 Attempting to load audio from:', audioPath);
    console.log('🎵 Full URL will be:', window.location.origin + audioPath);
    
    try {
      const audio = new Audio();
      
      // Set up event listeners before setting src
      audio.addEventListener('loadstart', () => {
        console.log('🎵 Audio load started');
      });

      audio.addEventListener('canplay', () => {
        console.log('✅ Audio can start playing');
        setIsLoading(false);
      });

      audio.addEventListener('canplaythrough', () => {
        console.log('✅ Audio fully loaded and ready');
        currentAudioRef.current = audio;
        audio.play().then(() => {
          setIsPlaying(true);
          onAudioStateChange?.(true);
          console.log('🎵 Audio playing successfully');
        }).catch(error => {
          console.error('❌ Audio play failed:', error);
          setError('Failed to play audio. Please try again.');
          setIsPlaying(false);
          setIsLoading(false);
          currentAudioRef.current = null;
          onAudioStateChange?.(false);
        });
      });

      audio.addEventListener('ended', () => {
        console.log('🎵 Audio playback ended');
        setIsPlaying(false);
        currentAudioRef.current = null;
        onAudioStateChange?.(false);
      });

      audio.addEventListener('error', (e) => {
        console.error('❌ Audio loading error:', e);
        console.error('❌ Audio error details:', audio.error);
        setError(`Failed to load audio from: ${audioPath}`);
        setIsPlaying(false);
        setIsLoading(false);
        currentAudioRef.current = null;
        onAudioStateChange?.(false);
      });

      // Set audio properties
      audio.volume = audioConfig.volume_levels.narration;
      audio.preload = 'metadata';
      
      // Set the source and start loading
      audio.src = audioPath;
      audio.load();
      
    } catch (error) {
      console.error('❌ Error creating audio element:', error);
      setError('Failed to initialize audio player');
      setIsLoading(false);
    }
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
          disabled={isLoading}
          className={`rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 shadow-lg transform hover:scale-105 transition-all duration-200 ${buttonGradient} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          ) : (
            <Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-1" />
          )}
        </Button>
      </div>

      {error && (
        <div className="text-center">
          <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
          <p className="text-xs text-gray-500 mt-1">Please check that audio files are in the public folder</p>
        </div>
      )}

      <div className={`rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 text-center ${gradientColors}`}>
        <p className="text-xs sm:text-sm italic text-gray-700 dark:text-gray-300 leading-relaxed">
          "{sampleText}"
        </p>
      </div>
    </div>
  );
};
