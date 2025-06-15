
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

interface BackgroundMusicProps {
  className?: string;
  showVolumeControl?: boolean;
}

const BackgroundMusic = ({ className = "", showVolumeControl = true }: BackgroundMusicProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element for background music
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    
    // Using a placeholder URL - in production, you'd use actual children's music
    // For demo purposes, we'll simulate the functionality
    audioRef.current.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmYbBjiS2O/NeSsFJnbH8N2QQAoUXrTp66hVFApGnuDyvmYbBzie1+/OdSsFJnfH8N2QQAoUXrTp66hVFApGnuDyvmYbBji=';

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Handle autoplay policy
        audioRef.current.play().catch(error => {
          console.log('Autoplay prevented:', error);
          // Could show a user-friendly message here
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`group ${className}`}>
      <div className="flex items-center gap-2">
        <Button
          onClick={toggleMusic}
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-lg hover:shadow-xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105"
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        >
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          )}
        </Button>
        
        {showVolumeControl && isPlaying && (
          <div className="flex items-center gap-2 px-3 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-full shadow-lg animate-fade-in">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-16 h-1 bg-purple-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
              aria-label="Volume control"
            />
            <span className="text-xs text-purple-600 dark:text-purple-400 w-8 font-medium">
              {Math.round(volume * 100)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundMusic;
