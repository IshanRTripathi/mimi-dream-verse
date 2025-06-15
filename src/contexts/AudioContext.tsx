
import React, { createContext, useContext, useRef, useState } from 'react';
import { loadAudioConfig } from '@/utils/configLoader';

interface AudioContextType {
  playSound: (soundType: 'pop' | 'click' | 'success' | 'hover') => void;
  playBackgroundMusic: (trackName?: string) => void;
  stopBackgroundMusic: () => void;
  playStoryAudio: (type: 'personalized' | 'ai_narrator', variant?: string) => void;
  playAmbientSound: (type: 'forest' | 'ocean' | 'magical' | 'garden') => void;
  setVolume: (volume: number) => void;
  volume: number;
  isBackgroundMusicPlaying: boolean;
  stopAllAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

interface AudioProviderProps {
  children: React.ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const audioConfig = loadAudioConfig();
  const [volume, setVolumeState] = useState(audioConfig.volume_levels.background_music);
  const [isBackgroundMusicPlaying, setIsBackgroundMusicPlaying] = useState(false);
  
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackRef = useRef<string>('');
  const activeStoryAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio files with better error handling
  React.useEffect(() => {
    const initializeAudio = async () => {
      console.log('🎵 Initializing audio system...');
      
      try {
        // Initialize UI sounds
        const uiSounds: { [key: string]: HTMLAudioElement } = {};
        
        for (const [key, path] of Object.entries(audioConfig.ui_sounds)) {
          try {
            const audio = new Audio();
            audio.preload = 'none'; // Don't preload UI sounds
            audio.volume = audioConfig.volume_levels.ui_sounds;
            audio.src = path;
            uiSounds[key] = audio;
            console.log(`✅ UI sound initialized: ${key} -> ${path}`);
          } catch (error) {
            console.warn(`⚠️ Failed to initialize UI sound ${key}:`, error);
          }
        }

        audioRefs.current = uiSounds;
        console.log('🎵 Audio system initialized successfully');
      } catch (error) {
        console.error('❌ Failed to initialize audio system:', error);
      }
    };

    initializeAudio();

    return () => {
      console.log('🧹 Cleaning up audio system...');
      // Cleanup all audio
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
      if (activeStoryAudioRef.current) {
        activeStoryAudioRef.current.pause();
        activeStoryAudioRef.current = null;
      }
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
    };
  }, []);

  // Update volume when it changes
  React.useEffect(() => {
    Object.values(audioRefs.current).forEach(audio => {
      audio.volume = audioConfig.volume_levels.ui_sounds * volume;
    });
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = volume;
    }
    if (activeStoryAudioRef.current) {
      activeStoryAudioRef.current.volume = audioConfig.volume_levels.narration * volume;
    }
  }, [volume]);

  const stopAllAudio = () => {
    console.log('🛑 Stopping all story audio...');
    // Stop story audio only, not background music
    if (activeStoryAudioRef.current) {
      activeStoryAudioRef.current.pause();
      activeStoryAudioRef.current.currentTime = 0;
      activeStoryAudioRef.current = null;
    }
  };

  const playSound = async (soundType: 'pop' | 'click' | 'success' | 'hover') => {
    const audio = audioRefs.current[soundType];
    if (audio) {
      try {
        // Reset and play
        audio.currentTime = 0;
        await audio.play();
        console.log(`🔊 UI sound played: ${soundType}`);
      } catch (error) {
        console.log(`⚠️ UI sound play prevented (${soundType}):`, error);
      }
    }
  };

  const playBackgroundMusic = async (trackName?: string) => {
    try {
      const track = trackName 
        ? audioConfig.background_music.find(t => t.name === trackName)
        : audioConfig.background_music[0];
      
      if (!track) {
        console.warn('⚠️ Background music track not found:', trackName);
        return;
      }

      console.log('🎵 Starting background music:', track.name);

      // If same track is already playing, just resume it
      if (backgroundMusicRef.current && currentTrackRef.current === track.name && !backgroundMusicRef.current.paused) {
        console.log('🎵 Background music already playing');
        return;
      }

      // Stop current track if playing
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
      }

      // Create new audio instance
      const audio = new Audio();
      audio.src = track.file;
      audio.volume = track.volume * volume;
      audio.loop = track.loop;
      audio.preload = 'metadata';
      
      backgroundMusicRef.current = audio;
      currentTrackRef.current = track.name;

      audio.addEventListener('canplaythrough', async () => {
        try {
          await audio.play();
          setIsBackgroundMusicPlaying(true);
          console.log('✅ Background music started successfully');
        } catch (error) {
          console.log('⚠️ Background music play prevented:', error);
          setIsBackgroundMusicPlaying(false);
        }
      });

      audio.addEventListener('ended', () => {
        setIsBackgroundMusicPlaying(false);
        console.log('🎵 Background music ended');
      });

      audio.addEventListener('error', (e) => {
        console.error('❌ Background music error:', e);
        setIsBackgroundMusicPlaying(false);
      });

      audio.load();
    } catch (error) {
      console.error('❌ Failed to start background music:', error);
    }
  };

  const stopBackgroundMusic = () => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
      setIsBackgroundMusicPlaying(false);
      console.log('🛑 Background music stopped');
    }
  };

  const playStoryAudio = async (type: 'personalized' | 'ai_narrator', variant?: string) => {
    // Stop any currently playing story audio
    stopAllAudio();

    try {
      let audioPath: string;
      
      if (type === 'personalized') {
        audioPath = variant === 'dad' 
          ? audioConfig.story_audio.personalized.dad_voice 
          : audioConfig.story_audio.personalized.mom_voice;
      } else {
        audioPath = variant === 'alternative'
          ? audioConfig.story_audio.ai_narrator.alternative
          : audioConfig.story_audio.ai_narrator.default;
      }

      console.log('🎵 Playing story audio:', audioPath);

      const audio = new Audio();
      audio.src = audioPath;
      audio.volume = audioConfig.volume_levels.narration * volume;
      audio.preload = 'metadata';
      activeStoryAudioRef.current = audio;
      
      // Clean up reference when audio ends
      audio.addEventListener('ended', () => {
        if (activeStoryAudioRef.current === audio) {
          activeStoryAudioRef.current = null;
          console.log('🎵 Story audio ended');
        }
      });

      audio.addEventListener('error', (e) => {
        console.error('❌ Story audio error:', e);
        if (activeStoryAudioRef.current === audio) {
          activeStoryAudioRef.current = null;
        }
      });
      
      await audio.play();
      console.log('✅ Story audio playing');
    } catch (error) {
      console.log('⚠️ Story audio play prevented:', error);
    }
  };

  const playAmbientSound = async (type: 'forest' | 'ocean' | 'magical' | 'garden') => {
    try {
      const audioPath = audioConfig.ambient_sounds[type];
      const audio = new Audio(audioPath);
      audio.volume = volume * 0.3; // Ambient sounds are quieter
      audio.loop = true;
      
      await audio.play();
      console.log(`🌿 Ambient sound playing: ${type}`);
    } catch (error) {
      console.log(`⚠️ Ambient sound play prevented (${type}):`, error);
    }
  };

  const setVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    console.log('🔊 Volume set to:', clampedVolume);
  };

  return (
    <AudioContext.Provider value={{ 
      playSound, 
      playBackgroundMusic,
      stopBackgroundMusic,
      playStoryAudio,
      playAmbientSound,
      setVolume, 
      volume,
      isBackgroundMusicPlaying,
      stopAllAudio
    }}>
      {children}
    </AudioContext.Provider>
  );
};
