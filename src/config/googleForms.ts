
// Google Forms Integration Configuration
export const GOOGLE_FORMS_CONFIG = {
  // Your pre-configured Google Form
  formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeEN03u9EGQ6wVte-6-hVBvbQ8GmJAG0-GvaokwkCPFMbbYyA/formResponse',
  emailFieldId: 'entry.551667936',
  
  // Set to true to enable Google Forms integration
  enabled: true
};

// Optional: Google Sheets API configuration (if you prefer this method)
export const GOOGLE_SHEETS_CONFIG = {
  spreadsheetId: '', // Add your spreadsheet ID here if using Sheets API
  apiKey: '', // Add your API key here if using Sheets API
  sheetName: 'Sheet1',
  enabled: false // Set to true if you want to use Sheets instead of Forms
};
