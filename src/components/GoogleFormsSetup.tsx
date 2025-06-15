
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, AlertCircle, ExternalLink, Mail, FileSpreadsheet } from 'lucide-react';
import { waitlistService } from '@/services/waitlistService';

const GoogleFormsSetup = () => {
  const [formUrl, setFormUrl] = useState('');
  const [emailFieldId, setEmailFieldId] = useState('');
  const [spreadsheetId, setSpreadsheetId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [sheetName, setSheetName] = useState('Sheet1');
  const [isConfigured, setIsConfigured] = useState(false);

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
          ✅ Google integration is now active! Waitlist signups will automatically be sent to your Google Sheet.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📊 Google Sheets Integration
        </CardTitle>
        <CardDescription>
          Since your form doesn't allow pre-filling, here are two ways to connect your waitlist to Google Sheets:
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="simple" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="simple" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Simple Form Method
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Direct API Method
            </TabsTrigger>
          </TabsList>

          <TabsContent value="simple" className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">📝 Try This Alternative Approach:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Go back to your <a href="https://docs.google.com/forms/d/1FAIpQLSeEN03u9EGQ6wVte-6-hVBvbQ8GmJAG0-GvaokwkCPFMbbYyA/edit" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Form (Edit Mode)</a></li>
                <li>Delete the current email question and create a new "Short answer" question</li>
                <li>Make sure it's NOT set as "Email" type, just regular "Short answer"</li>
                <li>Try the pre-fill link method again</li>
                <li>If that works, you'll get an entry ID like "entry.123456789"</li>
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

          <TabsContent value="api" className="space-y-6">
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
            <strong>Note:</strong> Both methods will save signups locally in your browser as backup. Choose the method that works best for your setup.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default GoogleFormsSetup;
