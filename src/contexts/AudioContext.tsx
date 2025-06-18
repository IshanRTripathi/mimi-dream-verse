import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { loadAudioConfig } from '@/utils/configLoader';

interface AudioContextType {
  playSound: (soundType: 'pop' | 'click' | 'success' | 'hover') => void;
  playBackgroundMusic: (trackName?: string) => void;
  stopBackgroundMusic: () => void;
  playStoryAudio: (type: 'personalized' | 'ai_narrator', variant?: string) => void;
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

  // 🧠 Initialize UI sounds
  useEffect(() => {
    const initUIAudio = () => {
      const uiSounds: { [key: string]: HTMLAudioElement } = {};
      for (const [key, path] of Object.entries(audioConfig.ui_sounds)) {
        const audio = new Audio(path);
        audio.preload = 'none';
        audio.volume = audioConfig.volume_levels.ui_sounds;
        uiSounds[key] = audio;
      }
      audioRefs.current = uiSounds;
    };

    initUIAudio();

    return () => {
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

  // 🔊 Update volumes dynamically
  useEffect(() => {
    Object.values(audioRefs.current).forEach(audio => {
      audio.volume = audioConfig.volume_levels.ui_sounds * volume;
    });
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = volume;
    }
  }, [volume]);

  const setVolume = (newVolume: number) => {
    const clamped = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clamped);
    console.log('🔊 Volume set to:', clamped);
  };

  const stopAllAudio = () => {
    console.log('🛑 Stopping only story audio');
    if (activeStoryAudioRef.current) {
      activeStoryAudioRef.current.pause();
      activeStoryAudioRef.current.currentTime = 0;
      activeStoryAudioRef.current = null;
    }
    // ❌ Do NOT stop background music
  };

  const playSound = async (soundType: 'pop' | 'click' | 'success' | 'hover') => {
    const audio = audioRefs.current[soundType];
    if (audio) {
      try {
        audio.currentTime = 0;
        await audio.play();
      } catch (err) {
        console.warn(`⚠️ Cannot play UI sound (${soundType}):`, err);
      }
    }
  };

  const playBackgroundMusic = async (trackName?: string) => {
    const track = trackName
      ? audioConfig.background_music.find(t => t.name === trackName)
      : audioConfig.background_music[0];

    if (!track) {
      console.warn('⚠️ Background music track not found:', trackName);
      return;
    }

    const audio = backgroundMusicRef.current;

    // If same track and already playing, resume if paused
    if (audio && currentTrackRef.current === track.name) {
      if (audio.paused) {
        try {
          await audio.play();
          setIsBackgroundMusicPlaying(true);
          console.log('🔁 Resumed background music');
        } catch (e) {
          console.warn('⚠️ Resume failed:', e);
        }
      }
      return;
    }

    // Stop previous if switching tracks
    if (audio) audio.pause();

    const newAudio = new Audio(track.file);
    newAudio.loop = track.loop;
    newAudio.volume = track.volume * volume;
    newAudio.preload = 'auto';

    newAudio.addEventListener('ended', () => setIsBackgroundMusicPlaying(false));
    newAudio.addEventListener('error', e => {
      console.error('❌ Background music error:', e);
      setIsBackgroundMusicPlaying(false);
    });

    backgroundMusicRef.current = newAudio;
    currentTrackRef.current = track.name;

    try {
      await newAudio.play();
      setIsBackgroundMusicPlaying(true);
      console.log('✅ Background music playing:', track.name);
    } catch (e) {
      console.warn('⚠️ Background music play blocked (likely autoplay policy):', e);
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
    console.log(`▶️ Story audio type: ${type} (variant: ${variant || 'default'})`);

    // Try to resume if already loaded and not ended
    if (activeStoryAudioRef.current && !activeStoryAudioRef.current.ended) {
      try {
        await activeStoryAudioRef.current.play();
        console.log('🔁 Resumed story audio');
        return;
      } catch (err) {
        console.warn('⚠️ Resume failed, creating new instance');
      }
    }

    stopAllAudio(); // Only stops story audio

    const path = type === 'personalized'
      ? audioConfig.story_audio.personalized
      : audioConfig.story_audio.ai_narrator;

    const audio = new Audio(path);
    audio.volume = 0.2; // fixed narration volume
    audio.preload = 'metadata';

    audio.addEventListener('ended', () => {
      if (activeStoryAudioRef.current === audio) {
        activeStoryAudioRef.current = null;
      }
    });

    audio.addEventListener('error', (e) => {
      console.error('❌ Story audio error:', e);
      if (activeStoryAudioRef.current === audio) {
        activeStoryAudioRef.current = null;
      }
    });

    activeStoryAudioRef.current = audio;

    try {
      await audio.play();
      console.log('✅ Story audio playing');
    } catch (err) {
      console.warn('⚠️ Story audio playback blocked:', err);
    }
  };

  return (
    <AudioContext.Provider value={{
      playSound,
      playBackgroundMusic,
      stopBackgroundMusic,
      playStoryAudio,
      setVolume,
      volume,
      isBackgroundMusicPlaying,
      stopAllAudio
    }}>
      {children}
    </AudioContext.Provider>
  );
};
