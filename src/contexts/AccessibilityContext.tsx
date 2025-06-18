import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilitySettings {
  dyslexiaFont: boolean;
  colorBlindness: boolean;
  animations: boolean;
  fontScale: number;
  highContrast: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  toggleDyslexiaFont: () => void;
  toggleColorBlindness: () => void;
  toggleAnimations: () => void;
  setFontScale: (scale: number) => void;
  toggleHighContrast: () => void;
}

const defaultSettings: AccessibilitySettings = {
  dyslexiaFont: false,
  colorBlindness: false,
  animations: true,
  fontScale: 100,
  highContrast: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);

  // Load settings from localStorage on initial render
  useEffect(() => {
    const savedSettings = localStorage.getItem('storymimi-accessibility');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
        
        // Apply saved settings
        applyDyslexiaFont(parsedSettings.dyslexiaFont);
        applyColorBlindness(parsedSettings.colorBlindness);
        applyAnimations(parsedSettings.animations);
        applyFontScale(parsedSettings.fontScale);
        applyHighContrast(parsedSettings.highContrast);
      } catch (error) {
        console.error('Failed to parse accessibility settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('storymimi-accessibility', JSON.stringify(settings));
  }, [settings]);

  // Helper functions to apply settings to the DOM
  const applyDyslexiaFont = (enabled: boolean) => {
    if (enabled) {
      document.documentElement.classList.add('dyslexia-font');
    } else {
      document.documentElement.classList.remove('dyslexia-font');
    }
  };

  const applyColorBlindness = (enabled: boolean) => {
    if (enabled) {
      document.documentElement.classList.add('colorblind-theme');
    } else {
      document.documentElement.classList.remove('colorblind-theme');
    }
  };

  const applyAnimations = (enabled: boolean) => {
    if (!enabled) {
      document.documentElement.classList.add('no-animations');
    } else {
      document.documentElement.classList.remove('no-animations');
    }
  };

  const applyFontScale = (scale: number) => {
    document.documentElement.style.fontSize = `${scale}%`;
  };

  const applyHighContrast = (enabled: boolean) => {
    if (enabled) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  // Toggle functions
  const toggleDyslexiaFont = () => {
    const newValue = !settings.dyslexiaFont;
    applyDyslexiaFont(newValue);
    setSettings(prev => ({ ...prev, dyslexiaFont: newValue }));
  };

  const toggleColorBlindness = () => {
    const newValue = !settings.colorBlindness;
    applyColorBlindness(newValue);
    setSettings(prev => ({ ...prev, colorBlindness: newValue }));
  };

  const toggleAnimations = () => {
    const newValue = !settings.animations;
    applyAnimations(newValue);
    setSettings(prev => ({ ...prev, animations: newValue }));
  };

  const setFontScale = (scale: number) => {
    applyFontScale(scale);
    setSettings(prev => ({ ...prev, fontScale: scale }));
  };

  const toggleHighContrast = () => {
    const newValue = !settings.highContrast;
    applyHighContrast(newValue);
    setSettings(prev => ({ ...prev, highContrast: newValue }));
  };

  return (
    <AccessibilityContext.Provider value={{
      settings,
      toggleDyslexiaFont,
      toggleColorBlindness,
      toggleAnimations,
      setFontScale,
      toggleHighContrast
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};