
import { useState, useEffect } from 'react';
import { Users, TrendingUp } from 'lucide-react';
import { waitlistService, WaitlistStats } from '@/services/waitlistService';

interface WaitlistCounterProps {
  variant?: 'default' | 'compact' | 'badge';
  showRecent?: boolean;
  className?: string;
}

const WaitlistCounter = ({ 
  variant = 'default', 
  showRecent = true, 
  className = '' 
}: WaitlistCounterProps) => {
  const [stats, setStats] = useState<WaitlistStats>({ totalSignups: 0, recentSignups: 0 });

  useEffect(() => {
    const updateStats = () => {
      setStats(waitlistService.getStats());
    };

    updateStats();

    // Listen for storage changes (when other tabs add signups)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'waitlist_stats') {
        updateStats();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also update every 30 seconds to catch local changes
    const interval = setInterval(updateStats, 30000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full text-xs font-medium text-purple-700 dark:text-purple-300 ${className}`}>
        <Users className="w-3 h-3" />
        <span>{waitlistService.getFormattedCount()} joined</span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 ${className}`}>
        <Users className="w-4 h-4 text-purple-500" />
        <span>{stats.totalSignups} people joined</span>
        {showRecent && stats.recentSignups > 0 && (
          <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +{stats.recentSignups} today
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-purple-200/50 dark:border-purple-700/50 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
          <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.totalSignups.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {stats.totalSignups === 1 ? 'person has' : 'people have'} joined
          </div>
          {showRecent && stats.recentSignups > 0 && (
            <div className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              +{stats.recentSignups} in the last 24 hours
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaitlistCounter;
