import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import ThemeToggle from './ThemeToggle';
import AccessibilityToggle from './AccessibilityToggle';
import BackgroundMusic from './BackgroundMusic';

interface ControlPanelProps {
  className?: string;
}

const ControlPanel = ({ className = "" }: ControlPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 dark:border-gray-700/30"
            aria-label="Open control panel"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-72 p-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-xl"
          align="end"
          side="top"
        >
          <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-white">
            Controls
          </h3>
          
          <div className="space-y-6">
            {/* Theme Toggle Section */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">
                Theme
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Toggle light/dark mode
                </span>
                <ThemeToggle />
              </div>
            </div>
            
            {/* Background Music Section */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">
                Background Music
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Toggle music on/off
                </span>
                <BackgroundMusic showVolumeControl={false} />
              </div>
            </div>
            
            {/* Accessibility Section */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">
                Accessibility
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Customize accessibility options
                </span>
                <AccessibilityToggle />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ControlPanel;