
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
  const [volume, setVolumeState] = useState(0.3);
  const [isBackgroundMusicPlaying, setIsBackgroundMusicPlaying] = useState(false);
  const audioConfig = loadAudioConfig();
  
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackRef = useRef<string>('');
  const activeAudioRefs = useRef<HTMLAudioElement[]>([]);

  // Initialize audio files
  React.useEffect(() => {
    // Initialize UI sounds
    const uiSounds: { [key: string]: HTMLAudioElement } = {};
    Object.entries(audioConfig.ui_sounds).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.volume = volume;
      uiSounds[key] = audio;
    });

    audioRefs.current = uiSounds;

    return () => {
      // Cleanup all audio
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
      activeAudioRefs.current.forEach(audio => {
        audio.pause();
        audio.src = '';
      });
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
    };
  }, []);

  // Update volume when it changes
  React.useEffect(() => {
    Object.values(audioRefs.current).forEach(audio => {
      audio.volume = volume;
    });
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = volume;
    }
    activeAudioRefs.current.forEach(audio => {
      audio.volume = volume;
    });
  }, [volume]);

  const stopAllAudio = () => {
    // Stop all active audio except background music
    activeAudioRefs.current.forEach(audio => {
      audio.pause();
    });
    activeAudioRefs.current = [];
  };

  const playSound = (soundType: 'pop' | 'click' | 'success' | 'hover') => {
    const audio = audioRefs.current[soundType];
    if (audio) {
      // Stop any previous instance of this sound
      audio.currentTime = 0;
      audio.play().catch(error => {
        console.log('Audio play prevented:', error);
      });
    }
  };

  const playBackgroundMusic = (trackName?: string) => {
    const track = trackName 
      ? audioConfig.background_music.find(t => t.name === trackName)
      : audioConfig.background_music[0];
    
    if (!track) return;

    if (backgroundMusicRef.current && currentTrackRef.current === track.name) {
      backgroundMusicRef.current.play().catch(console.log);
      setIsBackgroundMusicPlaying(true);
      return;
    }

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
  };

  const stopBackgroundMusic = () => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
      setIsBackgroundMusicPlaying(false);
    }
  };

  const playStoryAudio = (type: 'personalized' | 'ai_narrator', variant?: string) => {
    // Stop any currently playing story audio
    stopAllAudio();

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
    audio.volume = volume;
    
    // Add to active audio list
    activeAudioRefs.current.push(audio);
    
    // Remove from active list when ended
    audio.onended = () => {
      const index = activeAudioRefs.current.indexOf(audio);
      if (index > -1) {
        activeAudioRefs.current.splice(index, 1);
      }
    };
    
    audio.play().catch(console.log);
  };

  const playAmbientSound = (type: 'forest' | 'ocean' | 'magical' | 'garden') => {
    const audioPath = audioConfig.ambient_sounds[type];
    const audio = new Audio(audioPath);
    audio.volume = volume * 0.5; // Ambient sounds are quieter
    audio.loop = true;
    
    // Add to active audio list
    activeAudioRefs.current.push(audio);
    
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
