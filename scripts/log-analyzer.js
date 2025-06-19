import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const LOG_FILE_PATH = path.join(__dirname, '..', 'dev-logs.json');
const SOURCE_DIR = path.join(__dirname, '..', 'src');

// Common error patterns and their potential fixes
const ERROR_PATTERNS = [
  {
    pattern: /Cannot find module '(.+?)'/i,
    analyze: (match, logs) => ({
      type: 'missing-module',
      module: match[1],
      suggestion: `Install the missing module: npm install ${match[1]}`,
      severity: 'high'
    })
  },
  {
    pattern: /Failed to load resource: the server responded with a status of (\d+)/i,
    analyze: (match, logs) => {
      const status = match[1];
      let suggestion = '';
      
      if (status === '404') {
        suggestion = 'Check if the file exists in the correct location';
      } else if (status === '403') {
        suggestion = 'Check permissions for accessing the resource';
      } else if (status === '500') {
        suggestion = 'Server error occurred. Check server logs for details';
      } else {
        suggestion = `HTTP error ${status}. Check network tab for details`;
      }
      
      return {
        type: 'network-error',
        status,
        suggestion,
        severity: status >= 500 ? 'high' : 'medium'
      };
    }
  },
  {
    pattern: /Uncaught TypeError: (.+?) is not a function/i,
    analyze: (match, logs) => ({
      type: 'type-error',
      detail: match[1],
      suggestion: `Check if ${match[1].split('.')[0]} is properly imported and initialized`,
      severity: 'high'
    })
  },
  {
    pattern: /Uncaught ReferenceError: (.+?) is not defined/i,
    analyze: (match, logs) => ({
      type: 'reference-error',
      variable: match[1],
      suggestion: `Make sure ${match[1]} is defined before use or check import statements`,
      severity: 'high'
    })
  },
  {
    pattern: /Uncaught SyntaxError: (.+)/i,
    analyze: (match, logs) => ({
      type: 'syntax-error',
      detail: match[1],
      suggestion: 'Fix the syntax error in your code',
      severity: 'high'
    })
  },
  {
    pattern: /Loading chunk (\d+) failed/i,
    analyze: (match, logs) => ({
      type: 'chunk-load-error',
      chunk: match[1],
      suggestion: 'This could be due to network issues or a problem with code splitting. Try rebuilding the application.',
      severity: 'medium'
    })
  },
  {
    pattern: /Invalid prop `(.+?)` supplied to `(.+?)`/i,
    analyze: (match, logs) => ({
      type: 'invalid-prop',
      prop: match[1],
      component: match[2],
      suggestion: `Check the props passed to ${match[2]} component, specifically ${match[1]}`,
      severity: 'medium'
    })
  },
  {
    pattern: /Warning: (.+)/i,
    analyze: (match, logs) => ({
      type: 'react-warning',
      detail: match[1],
      suggestion: 'Address the React warning to improve application quality',
      severity: 'low'
    })
  },
  {
    pattern: /404 \(Not Found\)/i,
    analyze: (match, logs) => {
      // Try to extract the URL from surrounding context
      const logEntry = logs.find(log => log.text && log.text.includes('404 (Not Found)'));
      const url = logEntry ? extractUrlFromText(logEntry.text) : 'unknown resource';
      
      return {
        type: 'resource-not-found',
        resource: url,
        suggestion: `Check if the resource exists at the correct path: ${url}`,
        severity: 'medium'
      };
    }
  },
  {
    pattern: /CORS policy: No 'Access-Control-Allow-Origin' header/i,
    analyze: (match, logs) => ({
      type: 'cors-error',
      suggestion: 'Configure CORS headers on the server to allow requests from your origin',
      severity: 'high'
    })
  },
  {
    pattern: /StaticAssetManager\.images\.getByPath/i,
    analyze: (match, logs) => ({
      type: 'asset-path-error',
      suggestion: 'Check if the asset paths in staticAssetManager.ts are correct and the files exist in the expected locations',
      severity: 'medium'
    })
  }
];

// Helper function to extract URLs from text
function extractUrlFromText(text) {
  const urlPattern = /(https?:\/\/[^\s]+|\/(\w+\/)+[\w.-]+)/g;
  const matches = text.match(urlPattern);
  return matches ? matches[0] : 'unknown';
}

// Function to search for files that might contain the error source
async function findRelevantFiles(errorDetail) {
  const relevantFiles = [];
  
  // Simple implementation - in a real tool this would be more sophisticated
  const searchTerms = errorDetail.split(/\s+/).filter(term => term.length > 3);
  
  function searchInDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        searchInDirectory(filePath);
      } else if (stats.isFile() && /\.(js|jsx|ts|tsx)$/.test(file)) {
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          
          // Check if any search term is in the file
          const matchesSearchTerm = searchTerms.some(term => content.includes(term));
          
          if (matchesSearchTerm) {
            relevantFiles.push({
              path: filePath,
              relativePath: path.relative(path.join(__dirname, '..'), filePath)
            });
          }
        } catch (error) {
          console.error(`Error reading file ${filePath}:`, error.message);
        }
      }
    }
  }
  
  searchInDirectory(SOURCE_DIR);
  return relevantFiles;
}

// Main analysis function
async function analyzeDevLogs() {
  console.log('🔍 Analyzing development logs...');
  
  try {
    // Read the log file
    if (!fs.existsSync(LOG_FILE_PATH)) {
      console.error(`❌ Log file not found at ${LOG_FILE_PATH}`);
      return;
    }
    
    const logData = JSON.parse(fs.readFileSync(LOG_FILE_PATH, 'utf8'));
    
    // Extract errors and warnings
    const { errors, warnings, console: consoleLogs } = logData;
    
    if (errors.length === 0 && warnings.length === 0) {
      console.log('✅ No errors or warnings detected!');
      return;
    }
    
    console.log(`Found ${errors.length} errors and ${warnings.length} warnings`);
    
    // Analyze errors
    const analysisResults = [];
    
    // Process errors
    for (const error of errors) {
      const errorText = error.text || '';
      
      // Check against known patterns
      for (const { pattern, analyze } of ERROR_PATTERNS) {
        const match = errorText.match(pattern);
        if (match) {
          const analysis = analyze(match, [...errors, ...warnings, ...consoleLogs]);
          analysisResults.push({
            ...analysis,
            originalError: errorText,
            timestamp: error.timestamp
          });
          break;
        }
      }
    }
    
    // Process warnings (with lower severity)
    for (const warning of warnings) {
      const warningText = warning.text || '';
      
      // Check against known patterns
      for (const { pattern, analyze } of ERROR_PATTERNS) {
        const match = warningText.match(pattern);
        if (match) {
          const analysis = analyze(match, [...errors, ...warnings, ...consoleLogs]);
          analysisResults.push({
            ...analysis,
            severity: 'low', // Override severity for warnings
            originalError: warningText,
            timestamp: warning.timestamp
          });
          break;
        }
      }
    }
    
    // Sort by severity
    analysisResults.sort((a, b) => {
      const severityOrder = { high: 0, medium: 1, low: 2 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    });
    
    // Display results
    console.log('\n📊 ANALYSIS RESULTS:');
    
    if (analysisResults.length === 0) {
      console.log('No recognizable patterns found in the errors/warnings.');
    } else {
      for (const [index, result] of analysisResults.entries()) {
        const severityIcon = {
          high: '🔴',
          medium: '🟠',
          low: '🟡'
        }[result.severity];
        
        console.log(`\n${severityIcon} Issue #${index + 1} (${result.severity.toUpperCase()})`);
        console.log(`Type: ${result.type}`);
        console.log(`Original: ${result.originalError}`);
        console.log(`Suggestion: ${result.suggestion}`);
        
        // Find relevant files for high severity issues
        if (result.severity === 'high') {
          console.log('Searching for relevant files...');
          const relevantFiles = await findRelevantFiles(result.originalError);
          
          if (relevantFiles.length > 0) {
            console.log('Potentially relevant files:');
            relevantFiles.forEach(file => {
              console.log(`- ${file.relativePath}`);
            });
          } else {
            console.log('No specific files identified.');
          }
        }
      }
    }
    
    console.log('\n✅ Analysis complete!');
    
  } catch (error) {
    console.error('❌ Analysis failed:', error);
  }
}

// Run the analysis
analyzeDevLogs().catch(error => {
  console.error('❌ Fatal error:', error);
});