
import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm border-purple-200 hover:bg-purple-50 dark:bg-gray-800/80 dark:border-gray-600 dark:hover:bg-gray-700 transition-all duration-300"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-500" />
      )}
    </Button>
  );
};

export default ThemeToggle;
