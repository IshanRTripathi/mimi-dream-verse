
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, AlertCircle, ExternalLink, Mail, FileSpreadsheet, Zap } from 'lucide-react';
import { waitlistService } from '@/services/waitlistService';

const GoogleFormsSetup = () => {
  const [formUrl, setFormUrl] = useState('');
  const [emailFieldId, setEmailFieldId] = useState('');
  const [spreadsheetId, setSpreadsheetId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [sheetName, setSheetName] = useState('Sheet1');
  const [isConfigured, setIsConfigured] = useState(false);

  // Pre-configured form data
  const quickSetupFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeEN03u9EGQ6wVte-6-hVBvbQ8GmJAG0-GvaokwkCPFMbbYyA/formResponse';
  const quickSetupFieldId = 'entry.551667936';

  const handleQuickSetup = () => {
    waitlistService.configureGoogleForms(quickSetupFormUrl, quickSetupFieldId);
    setIsConfigured(true);
  };

  const handleFormsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formUrl && emailFieldId) {
      waitlistService.configureGoogleForms(formUrl, emailFieldId);
      setIsConfigured(true);
    }
  };

  const handleSheetsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (spreadsheetId && apiKey) {
      waitlistService.configureGoogleSheetsAPI(spreadsheetId, apiKey, sheetName);
      setIsConfigured(true);
    }
  };

  if (isConfigured) {
    return (
      <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
        <Check className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800 dark:text-green-200">
          ✅ Google integration is now active! Waitlist signups will automatically be sent to your Google Form/Sheet.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📊 Google Integration Setup
        </CardTitle>
        <CardDescription>
          Connect your waitlist to Google Forms or Google Sheets to automatically collect signups.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Quick Setup Option */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5" />
                Quick Setup - Your Form is Ready!
              </h3>
              <p className="text-green-700 dark:text-green-300 text-sm mb-4">
                I found your Google Form details! Click below to activate the integration instantly.
              </p>
              <div className="text-xs text-green-600 dark:text-green-400 space-y-1 mb-4">
                <div>Form ID: entry.551667936</div>
                <div>Form URL: Configured ✓</div>
              </div>
            </div>
            <Button 
              onClick={handleQuickSetup}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              Activate Now
            </Button>
          </div>
        </div>

        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          Or configure manually below
        </div>

        <Tabs defaultValue="forms" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="forms" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Google Forms
            </TabsTrigger>
            <TabsTrigger value="sheets" className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Google Sheets API
            </TabsTrigger>
          </TabsList>

          <TabsContent value="forms" className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">📝 Manual Google Forms Setup:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Get your form's submission URL (replace "viewform" with "formResponse")</li>
                <li>Get the field ID using the pre-fill method or inspect element</li>
                <li>Enter both values below</li>
              </ol>
            </div>

            <form onSubmit={handleFormsSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Google Form Submission URL</label>
                <Input
                  type="url"
                  placeholder="https://docs.google.com/forms/d/e/.../formResponse"
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Replace "viewform" with "formResponse" in your form URL
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Field Entry ID</label>
                <Input
                  type="text"
                  placeholder="entry.123456789"
                  value={emailFieldId}
                  onChange={(e) => setEmailFieldId(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Get this from the pre-fill link or by inspecting the form
                </p>
              </div>

              <Button type="submit" className="w-full">
                Configure Form Integration
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="sheets" className="space-y-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">🔑 Google Sheets API Setup:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Go to <a href="https://console.developers.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Cloud Console</a></li>
                <li>Create a new project or select existing one</li>
                <li>Enable the "Google Sheets API"</li>
                <li>Create credentials → API Key</li>
                <li>Copy your spreadsheet ID from the URL: docs.google.com/spreadsheets/d/<strong>SPREADSHEET_ID</strong>/edit</li>
                <li>Make sure your sheet is publicly viewable (Share → Anyone with link can edit)</li>
              </ol>
            </div>

            <form onSubmit={handleSheetsSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Spreadsheet ID</label>
                <Input
                  type="text"
                  placeholder="1FAIpQLSeEN03u9EGQ6wVte-6-hVBvbQ8GmJAG0..."
                  value={spreadsheetId}
                  onChange={(e) => setSpreadsheetId(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Found in your Google Sheets URL between /spreadsheets/d/ and /edit
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Google API Key</label>
                <Input
                  type="password"
                  placeholder="AIzaSyC-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your Google Cloud Console API key
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Sheet Name (Optional)</label>
                <Input
                  type="text"
                  placeholder="Sheet1"
                  value={sheetName}
                  onChange={(e) => setSheetName(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  The name of the sheet tab (default: Sheet1)
                </p>
              </div>

              <Button type="submit" className="w-full">
                Configure Sheets API Integration
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <Alert className="mt-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Note:</strong> All methods will save signups locally in your browser as backup. Choose the method that works best for your setup.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default GoogleFormsSetup;
