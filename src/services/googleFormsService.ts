
interface GoogleFormsSubmission {
  email: string;
  timestamp?: string;
}

interface GoogleSheetsConfig {
  spreadsheetId: string;
  apiKey: string;
  sheetName: string;
}

class GoogleFormsService {
  private formUrl: string = '';
  private emailFieldId: string = '';
  private sheetsConfig: GoogleSheetsConfig | null = null;

  // Set up the Google Form configuration
  configure(formUrl: string, emailFieldId: string) {
    this.formUrl = formUrl;
    this.emailFieldId = emailFieldId;
  }

  // Configure Google Sheets direct integration
  configureSheetsAPI(spreadsheetId: string, apiKey: string, sheetName: string = 'Sheet1') {
    this.sheetsConfig = { spreadsheetId, apiKey, sheetName };
  }

  // Submit email to Google Forms (original method)
  async submitToGoogleForms(email: string): Promise<boolean> {
    if (!this.formUrl || !this.emailFieldId) {
      console.error('Google Forms not configured. Please set up form URL and field ID.');
      return false;
    }

    try {
      const formData = new FormData();
      formData.append(this.emailFieldId, email);
      formData.append('timestamp', new Date().toISOString());

      // Submit to Google Forms
      const response = await fetch(this.formUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Required for Google Forms
      });

      // With no-cors, we can't check the actual response status
      // Google Forms will accept the submission if the form is set up correctly
      return true;
    } catch (error) {
      console.error('Failed to submit to Google Forms:', error);
      return false;
    }
  }

  // Submit directly to Google Sheets (alternative method)
  async submitToGoogleSheets(email: string): Promise<boolean> {
    if (!this.sheetsConfig) {
      console.error('Google Sheets API not configured.');
      return false;
    }

    try {
      const { spreadsheetId, apiKey, sheetName } = this.sheetsConfig;
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}:append?valueInputOption=RAW&key=${apiKey}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [[email, new Date().toISOString()]]
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Failed to submit to Google Sheets:', error);
      return false;
    }
  }

  // Check if any integration method is configured
  isConfigured(): boolean {
    return !!(this.formUrl && this.emailFieldId) || !!this.sheetsConfig;
  }

  // Check specific configuration types
  isFormsConfigured(): boolean {
    return !!(this.formUrl && this.emailFieldId);
  }

  isSheetsConfigured(): boolean {
    return !!this.sheetsConfig;
  }
}

export const googleFormsService = new GoogleFormsService();
