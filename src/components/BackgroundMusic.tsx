import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';
import { AssetManager } from '@/utils/assetManager';

interface BackgroundMusicProps {
  className?: string;
  showVolumeControl?: boolean;
}

const BackgroundMusic = ({ className = "", showVolumeControl = true }: BackgroundMusicProps) => {
  const { 
    playBackgroundMusic, 
    stopBackgroundMusic, 
    setVolume, 
    volume, 
    isBackgroundMusicPlaying
  } = useAudio();

  const toggleMusic = () => {
    if (isBackgroundMusicPlaying) {
      stopBackgroundMusic();
      AssetManager.utils.logAssetLoad('audio', 'background music stopped', true);
    } else {
      playBackgroundMusic(); // Plays the first track by default
      AssetManager.utils.logAssetLoad('audio', 'background music started', true);
    }
  };

  return (
    <div className={`group ${className}`}>
      <div className="flex items-center gap-2">
        <Button
          onClick={toggleMusic}
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all duration-300 hover:scale-105"
          aria-label={isBackgroundMusicPlaying ? 'Pause background music' : 'Play background music'}
        >
          {isBackgroundMusicPlaying ? (
            <Volume2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          )}
        </Button>
        
        {showVolumeControl && isBackgroundMusicPlaying && (
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
