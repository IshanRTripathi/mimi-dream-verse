
import React, { createContext, useContext, useRef, useState } from 'react';

interface AudioContextType {
  playSound: (soundType: 'pop' | 'click' | 'success') => void;
  setVolume: (volume: number) => void;
  volume: number;
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
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  // Initialize audio files
  React.useEffect(() => {
    // Create different audio elements for different sounds
    // Using data URLs for demo - in production you'd use actual audio files
    const popSound = new Audio();
    popSound.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmYbBjiS2O/NeSsFJnbH8N2QQAoUXrTp66hVFApGnuDyvmYbBzie1+/OdSsFJnfH8N2QQAoUXrTp66hVFApGnuDyvmYbBji=';
    popSound.volume = volume;

    const clickSound = new Audio();
    clickSound.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmYbBjiS2O/NeSsFJnbH8N2QQAoUXrTp66hVFApGnuDyvmYbBzie1+/OdSsFJnfH8N2QQAoUXrTp66hVFApGnuDyvmYbBji=';
    clickSound.volume = volume;

    const successSound = new Audio();
    successSound.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmYbBjiS2O/NeSsFJnbH8N2QQAoUXrTp66hVFApGnuDyvmYbBzie1+/OdSsFJnfH8N2QQAoUXrTp66hVFApGnuDyvmYbBji=';
    successSound.volume = volume;

    audioRefs.current = {
      pop: popSound,
      click: clickSound,
      success: successSound
    };

    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  // Update volume when it changes
  React.useEffect(() => {
    Object.values(audioRefs.current).forEach(audio => {
      audio.volume = volume;
    });
  }, [volume]);

  const playSound = (soundType: 'pop' | 'click' | 'success') => {
    const audio = audioRefs.current[soundType];
    if (audio) {
      audio.currentTime = 0; // Reset to beginning
      audio.play().catch(error => {
        console.log('Audio play prevented:', error);
      });
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(Math.max(0, Math.min(1, newVolume)));
  };

  return (
    <AudioContext.Provider value={{ playSound, setVolume, volume }}>
      {children}
    </AudioContext.Provider>
  );
};
