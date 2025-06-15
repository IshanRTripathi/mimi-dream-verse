
import { googleFormsService } from './googleFormsService';

interface WaitlistEntry {
  id: string;
  email: string;
  timestamp: number;
}

interface WaitlistStats {
  totalSignups: number;
  recentSignups: number; // Last 24 hours
}

class WaitlistService {
  private readonly STORAGE_KEY = 'waitlist_entries';
  private readonly STATS_KEY = 'waitlist_stats';

  // Get all waitlist entries
  private getEntries(): WaitlistEntry[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  // Save entries to localStorage
  private saveEntries(entries: WaitlistEntry[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(entries));
      this.updateStats(entries);
    } catch (error) {
      console.error('Failed to save waitlist entries:', error);
    }
  }

  // Update statistics
  private updateStats(entries: WaitlistEntry[]): void {
    const now = Date.now();
    const dayAgo = now - (24 * 60 * 60 * 1000);
    
    const stats: WaitlistStats = {
      totalSignups: entries.length,
      recentSignups: entries.filter(entry => entry.timestamp > dayAgo).length
    };

    try {
      localStorage.setItem(this.STATS_KEY, JSON.stringify(stats));
    } catch (error) {
      console.error('Failed to save waitlist stats:', error);
    }
  }

  // Add a new signup with dual storage (localStorage + Google Forms)
  async addSignup(email: string): Promise<{ success: boolean; alreadyExists: boolean }> {
    const entries = this.getEntries();
    
    // Check if email already exists
    if (entries.some(entry => entry.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, alreadyExists: true };
    }

    const newEntry: WaitlistEntry = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      email: email.toLowerCase(),
      timestamp: Date.now()
    };

    // Save to localStorage first
    entries.push(newEntry);
    this.saveEntries(entries);

    // Try to submit to Google Forms if configured
    let googleFormsSuccess = true;
    if (googleFormsService.isConfigured()) {
      try {
        googleFormsSuccess = await googleFormsService.submitToGoogleForms(email);
        if (!googleFormsSuccess) {
          console.warn('Failed to submit to Google Forms, but saved locally');
        }
      } catch (error) {
        console.warn('Google Forms submission failed:', error);
      }
    }

    return { success: true, alreadyExists: false };
  }

  // Get current statistics
  getStats(): WaitlistStats {
    try {
      const stored = localStorage.getItem(this.STATS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fall through to default
    }

    // Fallback: calculate from entries
    const entries = this.getEntries();
    const now = Date.now();
    const dayAgo = now - (24 * 60 * 60 * 1000);
    
    return {
      totalSignups: entries.length,
      recentSignups: entries.filter(entry => entry.timestamp > dayAgo).length
    };
  }

  // Check if email is already signed up
  isEmailSignedUp(email: string): boolean {
    const entries = this.getEntries();
    return entries.some(entry => entry.email.toLowerCase() === email.toLowerCase());
  }

  // Get formatted count for display
  getFormattedCount(): string {
    const stats = this.getStats();
    const count = stats.totalSignups;
    
    if (count < 1000) {
      return count.toString();
    } else if (count < 10000) {
      return `${Math.floor(count / 100) / 10}k`;
    } else {
      return `${Math.floor(count / 1000)}k+`;
    }
  }

  // Configure Google Forms integration
  configureGoogleForms(formUrl: string, emailFieldId: string) {
    googleFormsService.configure(formUrl, emailFieldId);
  }
}

export const waitlistService = new WaitlistService();
export type { WaitlistStats };
