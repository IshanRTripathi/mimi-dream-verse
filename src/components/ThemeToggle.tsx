
import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="w-10 h-10 rounded-full hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all duration-300 hover:scale-105"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
      ) : (
        <Sun className="w-4 h-4 text-yellow-500" />
      )}
    </Button>
  );
};

export default ThemeToggle;
