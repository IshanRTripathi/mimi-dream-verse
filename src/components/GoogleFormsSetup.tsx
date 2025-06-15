
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Check } from 'lucide-react';

const GoogleFormsSetup = () => {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📊 Google Integration Status
        </CardTitle>
        <CardDescription>
          Your waitlist is pre-configured with Google Forms integration.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
          <Check className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            ✅ Google Forms integration is active! Waitlist signups are automatically sent to your configured Google Form.
            <br />
            <br />
            <strong>Form Configuration:</strong>
            <br />
            • Form URL: Configured ✓
            <br />
            • Email Field ID: entry.551667936 ✓
            <br />
            <br />
            No additional setup required. The integration is ready to collect signups!
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default GoogleFormsSetup;
