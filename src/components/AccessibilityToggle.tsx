
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Accessibility } from 'lucide-react';

const AccessibilityToggle = () => {
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [colorBlindness, setColorBlindness] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [fontScale, setFontScale] = useState([100]);
  const [highContrast, setHighContrast] = useState(false);

  const handleDyslexiaToggle = (checked: boolean) => {
    setDyslexiaFont(checked);
    if (checked) {
      document.documentElement.style.fontFamily = 'Arial, sans-serif';
    } else {
      document.documentElement.style.fontFamily = '';
    }
  };

  const handleColorBlindnessToggle = (checked: boolean) => {
    setColorBlindness(checked);
    if (checked) {
      document.documentElement.classList.add('colorblind-theme');
    } else {
      document.documentElement.classList.remove('colorblind-theme');
    }
  };

  const handleAnimationsToggle = (checked: boolean) => {
    setAnimations(checked);
    if (!checked) {
      document.documentElement.classList.add('no-animations');
    } else {
      document.documentElement.classList.remove('no-animations');
    }
  };

  const handleFontScaleChange = (value: number[]) => {
    setFontScale(value);
    document.documentElement.style.fontSize = `${value[0]}%`;
  };

  const handleHighContrastToggle = (checked: boolean) => {
    setHighContrast(checked);
    if (checked) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-lg hover:shadow-xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105"
          aria-label="Accessibility options"
        >
          <Accessibility className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent 
        className="w-72 p-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-white/20 dark:border-gray-700/30"
        align="end"
      >
        <h3 className="font-semibold text-sm mb-3 text-gray-800 dark:text-white">
          Accessibility Options
        </h3>
        
        <div className="space-y-4">
          {/* Dyslexia Friendly Font */}
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Dyslexia Friendly Font
            </label>
            <Switch 
              checked={dyslexiaFont}
              onCheckedChange={handleDyslexiaToggle}
            />
          </div>

          {/* Color Blindness Theme */}
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Color Blindness Theme
            </label>
            <Switch 
              checked={colorBlindness}
              onCheckedChange={handleColorBlindnessToggle}
            />
          </div>

          {/* Enable/Disable Animations */}
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Enable Animations
            </label>
            <Switch 
              checked={animations}
              onCheckedChange={handleAnimationsToggle}
            />
          </div>

          {/* Font Size Scale */}
          <div className="space-y-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Font Size: {fontScale[0]}%
            </label>
            <Slider
              value={fontScale}
              onValueChange={handleFontScaleChange}
              max={150}
              min={75}
              step={5}
              className="w-full"
            />
          </div>

          {/* High Contrast Mode */}
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-700 dark:text-gray-300">
              High Contrast Mode
            </label>
            <Switch 
              checked={highContrast}
              onCheckedChange={handleHighContrastToggle}
            />
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AccessibilityToggle;
