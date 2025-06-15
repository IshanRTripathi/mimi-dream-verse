
interface GoogleFormsSubmission {
  email: string;
  timestamp?: string;
}

class GoogleFormsService {
  private formUrl: string = '';
  private emailFieldId: string = '';

  // Set up the Google Form configuration
  configure(formUrl: string, emailFieldId: string) {
    this.formUrl = formUrl;
    this.emailFieldId = emailFieldId;
  }

  // Submit email to Google Forms
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

  // Check if Google Forms is configured
  isConfigured(): boolean {
    return !!(this.formUrl && this.emailFieldId);
  }
}

export const googleFormsService = new GoogleFormsService();
