
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Check, AlertCircle, ExternalLink } from 'lucide-react';
import { waitlistService } from '@/services/waitlistService';

const GoogleFormsSetup = () => {
  const [formUrl, setFormUrl] = useState('');
  const [emailFieldId, setEmailFieldId] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formUrl && emailFieldId) {
      waitlistService.configureGoogleForms(formUrl, emailFieldId);
      setIsConfigured(true);
    }
  };

  if (isConfigured) {
    return (
      <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
        <Check className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800 dark:text-green-200">
          ✅ Google Forms integration is now active! Waitlist signups will automatically be sent to your Google Sheet.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📊 Google Forms Setup
          <a 
            href="https://forms.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </CardTitle>
        <CardDescription>
          Connect your waitlist to Google Sheets via Google Forms. Follow these steps:
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">📝 Step-by-Step Instructions:</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Go to <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Forms</a> and create a new form</li>
            <li>Add a "Short answer" question titled "Email Address"</li>
            <li>Click the "Send" button → Link tab → Copy the form URL</li>
            <li>Right-click on the email field → "Inspect element" → Find the "name" attribute (starts with "entry.")</li>
            <li>Paste both values below</li>
          </ol>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Google Form URL</label>
            <Input
              type="url"
              placeholder="https://docs.google.com/forms/d/..."
              value={formUrl}
              onChange={(e) => setFormUrl(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              The shareable link to your Google Form
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email Field ID</label>
            <Input
              type="text"
              placeholder="entry.123456789"
              value={emailFieldId}
              onChange={(e) => setEmailFieldId(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              The "name" attribute of the email input field (right-click → inspect element)
            </p>
          </div>

          <Button type="submit" className="w-full">
            Configure Google Forms Integration
          </Button>
        </form>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Note:</strong> This setup is stored in your browser. You'll need to reconfigure if you clear your browser data.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default GoogleFormsSetup;
