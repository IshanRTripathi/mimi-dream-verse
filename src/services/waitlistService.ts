import { googleFormsService } from './googleFormsService';
import { GOOGLE_FORMS_CONFIG, GOOGLE_SHEETS_CONFIG } from '@/config/googleForms';

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

  // Hardcoded stats
  private readonly HARDCODED_STATS = {
    totalSignups: 41,
    recentSignups: 12
  };

  constructor() {
    // Auto-configure Google Forms on initialization
    this.initializeGoogleIntegration();
  }

  private initializeGoogleIntegration() {
    if (GOOGLE_FORMS_CONFIG.enabled && GOOGLE_FORMS_CONFIG.formUrl && GOOGLE_FORMS_CONFIG.emailFieldId) {
      googleFormsService.configure(GOOGLE_FORMS_CONFIG.formUrl, GOOGLE_FORMS_CONFIG.emailFieldId);
    }
    
    if (GOOGLE_SHEETS_CONFIG.enabled && GOOGLE_SHEETS_CONFIG.spreadsheetId && GOOGLE_SHEETS_CONFIG.apiKey) {
      googleFormsService.configureSheetsAPI(
        GOOGLE_SHEETS_CONFIG.spreadsheetId, 
        GOOGLE_SHEETS_CONFIG.apiKey, 
        GOOGLE_SHEETS_CONFIG.sheetName
      );
    }
  }

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

  // Add a new signup with multiple integration options
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

    // Try to submit to configured integrations
    if (googleFormsService.isConfigured()) {
      try {
        if (googleFormsService.isFormsConfigured()) {
          const formsSuccess = await googleFormsService.submitToGoogleForms(email);
          if (!formsSuccess) {
            console.warn('Failed to submit to Google Forms, but saved locally');
          }
        }
        
        if (googleFormsService.isSheetsConfigured()) {
          const sheetsSuccess = await googleFormsService.submitToGoogleSheets(email);
          if (!sheetsSuccess) {
            console.warn('Failed to submit to Google Sheets, but saved locally');
          }
        }
      } catch (error) {
        console.warn('Integration submission failed:', error);
      }
    }

    return { success: true, alreadyExists: false };
  }

  // Return hardcoded statistics instead of calculated ones
  getStats(): WaitlistStats {
    return this.HARDCODED_STATS;
  }

  // Check if email is already signed up
  isEmailSignedUp(email: string): boolean {
    const entries = this.getEntries();
    return entries.some(entry => entry.email.toLowerCase() === email.toLowerCase());
  }

  // Use hardcoded count for display
  getFormattedCount(): string {
    const count = this.HARDCODED_STATS.totalSignups;
    
    if (count < 1000) {
      return count.toString();
    } else if (count < 10000) {
      return `${Math.floor(count / 100) / 10}k`;
    } else {
      return `${Math.floor(count / 1000)}k+`;
    }
  }
}

export const waitlistService = new WaitlistService();
export type { WaitlistStats };
