
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Accessibility } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

const AccessibilityToggle = () => {
  const { 
    settings, 
    toggleDyslexiaFont, 
    toggleColorBlindness, 
    toggleAnimations, 
    setFontScale, 
    toggleHighContrast 
  } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);
  const [fontScaleValue, setFontScaleValue] = useState([settings.fontScale]);

  const handleFontScaleChange = (value: number[]) => {
    setFontScaleValue(value);
    setFontScale(value[0]);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all duration-300 hover:scale-105"
          aria-label="Accessibility options"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Accessibility className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
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
              checked={settings.dyslexiaFont}
              onCheckedChange={() => toggleDyslexiaFont()}
            />
          </div>

          {/* Color Blindness Theme */}
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Color Blindness Theme
            </label>
            <Switch 
              checked={settings.colorBlindness}
              onCheckedChange={() => toggleColorBlindness()}
            />
          </div>

          {/* Enable/Disable Animations */}
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Enable Animations
            </label>
            <Switch 
              checked={settings.animations}
              onCheckedChange={() => toggleAnimations()}
            />
          </div>

          {/* Font Size Scale */}
          <div className="space-y-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Font Size: {fontScaleValue[0]}%
            </label>
            <Slider
              value={fontScaleValue}
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
              checked={settings.highContrast}
              onCheckedChange={() => toggleHighContrast()}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AccessibilityToggle;
