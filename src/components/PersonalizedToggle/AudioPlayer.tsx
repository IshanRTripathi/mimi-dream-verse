import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { StaticAssetManager } from '@/utils/staticAssetManager';
import { useAudio } from '@/contexts/AudioContext';

interface AudioPlayerProps {
  audioType: 'normal' | 'personalized';
  title: string;
  description: string;
  sampleText: string;
  gradientColors: string;
  buttonGradient: string;
  shouldStop?: boolean;
  onAudioStateChange?: (isPlaying: boolean) => void;
  sceneActive: boolean;
}

export const AudioPlayer = ({ 
  audioType, 
  title, 
  description, 
  sampleText, 
  gradientColors,
  buttonGradient,
  shouldStop = false,
  onAudioStateChange,
  sceneActive
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioProgressRef = useRef<number>(0);
  const { stopAllAudio } = useAudio();

  // Stop audio when shouldStop prop changes to true or scene becomes inactive
  useEffect(() => {
    if ((shouldStop || !sceneActive) && currentAudioRef.current) {
      pauseCurrentAudio();
    }
  }, [shouldStop, sceneActive]);
  
  // Clean up audio when component unmounts
  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        pauseCurrentAudio();
      }
    };
  }, []);

  const stopCurrentAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      audioProgressRef.current = 0;
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
      setIsPlaying(false);
      setIsLoading(false);
      onAudioStateChange?.(false);
      StaticAssetManager.utils.logAssetLoad('audio', 'stopped', true);
    }
  };
  
  const pauseCurrentAudio = () => {
    if (currentAudioRef.current) {
      audioProgressRef.current = currentAudioRef.current.currentTime;
      currentAudioRef.current.pause();
      setIsPlaying(false);
      onAudioStateChange?.(false);
      StaticAssetManager.utils.logAssetLoad('audio', 'paused', true);
    }
  };

  const toggleAudio = async () => {
    if (currentAudioRef.current && isPlaying) {
      pauseCurrentAudio();
      return;
    }
    
    // If we have a paused audio element, resume it
    if (currentAudioRef.current && !isPlaying) {
      try {
        await currentAudioRef.current.play();
        setIsPlaying(true);
        onAudioStateChange?.(true);
        return;
      } catch (error) {
        console.error('❌ Failed to resume audio:', error);
        // If resuming fails, try to restart playback
      }
    }

    // Clear any previous errors
    setError(null);
    setIsLoading(true);

    // Use centralized asset management
    const audioSrc = StaticAssetManager.audio.getStoryAudio(audioType);
    StaticAssetManager.utils.logAssetLoad('audio', audioType, true);
    
    try {
      const audio = new Audio();
      
      // Set up event listeners before setting src
      audio.addEventListener('loadstart', () => {
        console.log(`🎵 Audio load started for ${audioType}`);
      });

      audio.addEventListener('canplay', () => {
        console.log('✅ Audio can start playing');
        setIsLoading(false);
      });

      audio.addEventListener('canplaythrough', () => {
        console.log(`✅ Audio fully loaded and ready for ${audioType}`);
        currentAudioRef.current = audio;
        
        // If we have a saved position, restore it
        if (audioProgressRef.current > 0) {
          audio.currentTime = audioProgressRef.current;
        }
        
        audio.play().then(() => {
          setIsPlaying(true);
          onAudioStateChange?.(true);
          StaticAssetManager.utils.logAssetLoad('audio', 'playing', true);
        }).catch(error => {
          console.error(`❌ Audio play failed for ${audioType}:`, error);
          setError('Failed to play audio. Please try again.');
          setIsPlaying(false);
          setIsLoading(false);
          currentAudioRef.current = null;
          onAudioStateChange?.(false);
        });
      });

      audio.addEventListener('ended', () => {
        StaticAssetManager.utils.logAssetLoad('audio', `${audioType} ended`, true);
        setIsPlaying(false);
        audioProgressRef.current = 0;
        currentAudioRef.current = null;
        onAudioStateChange?.(false);
      });

      audio.addEventListener('error', (e) => {
        console.error(`❌ Audio loading error for ${audioType}:`, e);
        console.error(`❌ Audio error details for ${audioType}:`, audio.error);
        setError(`Failed to load ${audioType} audio`);
        setIsPlaying(false);
        setIsLoading(false);
        currentAudioRef.current = null;
        audioProgressRef.current = 0;
        onAudioStateChange?.(false);
      });

      // Set audio properties using centralized config
      audio.volume = StaticAssetManager.audio.volumes.narration;
      audio.preload = 'auto'; // Change to auto for better performance
      
      // Set the source and start loading
      audio.src = audioSrc;
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
        <div className="text-center text-red-500 text-xs mt-2">
          {error}
        </div>
      )}

      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-gray-100 dark:border-gray-700 text-xs sm:text-sm text-gray-600 dark:text-gray-300 italic">
        "{sampleText}"
      </div>
    </div>
  );
};
