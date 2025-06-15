
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

  // Initialize audio files
  React.useEffect(() => {
    // Initialize UI sounds
    const uiSounds: { [key: string]: HTMLAudioElement } = {};
    Object.entries(audioConfig.ui_sounds).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.volume = audioConfig.volume_levels.ui_sounds;
      uiSounds[key] = audio;
    });

    audioRefs.current = uiSounds;

    return () => {
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
      audio.volume = audioConfig.volume_levels.ui_sounds;
    });
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = volume;
    }
    if (activeStoryAudioRef.current) {
      activeStoryAudioRef.current.volume = audioConfig.volume_levels.narration;
    }
  }, [volume]);

  const stopAllAudio = () => {
    // Stop story audio only, not background music
    if (activeStoryAudioRef.current) {
      activeStoryAudioRef.current.pause();
      activeStoryAudioRef.current = null;
    }
  };

  const playSound = (soundType: 'pop' | 'click' | 'success' | 'hover') => {
    const audio = audioRefs.current[soundType];
    if (audio) {
      // Don't interfere with background music
      audio.currentTime = 0;
      audio.play().catch(error => {
        console.log('UI sound play prevented:', error);
      });
    }
  };

  const playBackgroundMusic = (trackName?: string) => {
    const track = trackName 
      ? audioConfig.background_music.find(t => t.name === trackName)
      : audioConfig.background_music[0];
    
    if (!track) return;

    // If same track is already playing, just resume it
    if (backgroundMusicRef.current && currentTrackRef.current === track.name && !backgroundMusicRef.current.paused) {
      return;
    }

    // If we have a different track or stopped track, start fresh
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
    }

    backgroundMusicRef.current = new Audio(track.file);
    backgroundMusicRef.current.volume = track.volume * volume;
    backgroundMusicRef.current.loop = track.loop;
    currentTrackRef.current = track.name;

    backgroundMusicRef.current.play().then(() => {
      setIsBackgroundMusicPlaying(true);
    }).catch(error => {
      console.log('Background music play prevented:', error);
    });

    backgroundMusicRef.current.onended = () => {
      setIsBackgroundMusicPlaying(false);
    };
  };

  const stopBackgroundMusic = () => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
      setIsBackgroundMusicPlaying(false);
    }
  };

  const playStoryAudio = (type: 'personalized' | 'ai_narrator', variant?: string) => {
    // Stop any currently playing story audio
    if (activeStoryAudioRef.current) {
      activeStoryAudioRef.current.pause();
      activeStoryAudioRef.current = null;
    }

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

    const audio = new Audio(audioPath);
    audio.volume = audioConfig.volume_levels.narration;
    activeStoryAudioRef.current = audio;
    
    console.log('🔊 Story audio volume set to:', audio.volume);
    
    // Clean up reference when audio ends
    audio.onended = () => {
      if (activeStoryAudioRef.current === audio) {
        activeStoryAudioRef.current = null;
      }
    };
    
    audio.play().catch(console.log);
  };

  const playAmbientSound = (type: 'forest' | 'ocean' | 'magical' | 'garden') => {
    const audioPath = audioConfig.ambient_sounds[type];
    const audio = new Audio(audioPath);
    audio.volume = volume * 0.3; // Ambient sounds are quieter
    audio.loop = true;
    
    audio.play().catch(console.log);
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(Math.max(0, Math.min(1, newVolume)));
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
