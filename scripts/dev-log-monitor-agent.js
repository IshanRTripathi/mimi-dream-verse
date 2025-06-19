import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const APP_URL = 'http://localhost:9999';
const LOG_FILE_PATH = path.join(__dirname, '..', 'dev-logs.json');
const SOURCE_DIR = path.join(__dirname, '..');
const MAX_MONITORING_TIME = 3600000; // 1 hour maximum monitoring time
const ANALYSIS_INTERVAL = 5000; // Analyze logs every 5 seconds
const RECONNECT_INTERVAL = 10000; // Try to reconnect every 10 seconds if disconnected
const MAX_RECONNECT_ATTEMPTS = 5; // Maximum number of reconnection attempts

// Initialize log storage
const logs = {
  console: [],
  network: [],
  errors: [],
  warnings: [],
  fixes: [] // Track applied fixes
};

// Error patterns to look for and their potential fixes
const ERROR_PATTERNS = [
  {
    pattern: /WebSocket connection.*closed/i,
    description: 'WebSocket connection closed unexpectedly',
    filePatterns: ['ConversationalAgent.tsx'],
    suggestedFix: 'Implement reconnection logic and proper error handling for WebSocket connections'
  },
  {
    pattern: /multiple instances of bg music/i,
    description: 'Multiple instances of background music playing simultaneously',
    filePatterns: ['CreateStory.tsx', 'ControlPanel.tsx', 'BackgroundMusic.tsx'],
    suggestedFix: 'Ensure BackgroundMusic component is only rendered once in the component tree'
  },
  {
    pattern: /Failed to load resource/i,
    description: 'Resource loading failure',
    filePatterns: null, // Will be determined from the error message
    suggestedFix: 'Check file paths and ensure resources exist'
  },
  {
    pattern: /Uncaught TypeError/i,
    description: 'Type error in JavaScript code',
    filePatterns: null, // Will be determined from the stack trace
    suggestedFix: 'Add null/undefined checks or type validation'
  },
  {
    pattern: /Cannot read properties of (null|undefined)/i,
    description: 'Attempting to access properties on null or undefined',
    filePatterns: null, // Will be determined from the stack trace
    suggestedFix: 'Add conditional checks before accessing properties'
  },
  {
    pattern: /NetworkError|CORS|403|404|500/i,
    description: 'Network request failed',
    filePatterns: null, // Will be determined from the URL
    suggestedFix: 'Check API endpoints, CORS configuration, or server status'
  }
];

// Track the state of the monitoring
let isMonitoring = false;
let reconnectAttempts = 0;
let browser = null;
let page = null;
let analysisInterval = null;
let cleanExitRequested = false;

/**
 * Extract file path from error stack trace or message
 * @param {string} errorText - The error message or stack trace
 * @returns {string|null} - The extracted file path or null if not found
 */
function extractFilePathFromError(errorText) {
  // Look for file paths in stack traces (webpack format)
  const webpackPathMatch = errorText.match(/\(([^)]+\.(?:js|jsx|ts|tsx)):\d+:\d+\)/);
  if (webpackPathMatch) return webpackPathMatch[1];
  
  // Look for file paths in regular stack traces
  const regularPathMatch = errorText.match(/at\s+(?:[\w.]+\s+\()?([^:)]+\.(?:js|jsx|ts|tsx)):\d+(?::\d+)?(?:\))?/);
  if (regularPathMatch) return regularPathMatch[1];
  
  // Look for file paths in URLs
  const urlPathMatch = errorText.match(/(?:http|https):\/\/localhost:\d+\/([^\s?#]+\.(?:js|jsx|ts|tsx))/);
  if (urlPathMatch) return urlPathMatch[1];
  
  return null;
}

/**
 * Find the most likely source file for an error
 * @param {Object} error - The error object
 * @returns {string|null} - The most likely source file path or null if not found
 */
async function findSourceFileForError(error) {
  // First try to extract from the error itself
  const extractedPath = extractFilePathFromError(error.text || error.stack || '');
  if (extractedPath) {
    // Convert to absolute path in the project
    return path.join(SOURCE_DIR, 'src', extractedPath.replace(/^src\//, ''));
  }
  
  // If error is related to a specific pattern, check the associated files
  for (const pattern of ERROR_PATTERNS) {
    if (pattern.pattern.test(error.text) && pattern.filePatterns) {
      // Return the first matching file that exists
      for (const filePattern of pattern.filePatterns) {
        const possiblePaths = [
          path.join(SOURCE_DIR, 'src', filePattern),
          path.join(SOURCE_DIR, 'src', 'components', filePattern),
          path.join(SOURCE_DIR, 'src', 'pages', filePattern),
          path.join(SOURCE_DIR, 'src', 'contexts', filePattern)
        ];
        
        for (const filePath of possiblePaths) {
          if (fs.existsSync(filePath)) {
            return filePath;
          }
        }
      }
    }
  }
  
  return null;
}

/**
 * Analyze logs for errors and suggest fixes
 */
async function analyzeLogs() {
  if (logs.errors.length === 0 && logs.warnings.length === 0) {
    console.log('✅ No errors or warnings detected');
    return;
  }
  
  console.log('\n🔍 ANALYZING LOGS FOR ISSUES:');
  
  // Process errors first
  for (const error of logs.errors) {
    // Skip errors we've already processed
    if (error.analyzed) continue;
    
    console.log(`\n❌ ERROR: ${error.text}`);
    
    // Match against known error patterns
    let matchedPattern = null;
    for (const pattern of ERROR_PATTERNS) {
      if (pattern.pattern.test(error.text)) {
        matchedPattern = pattern;
        console.log(`🔍 Identified issue: ${pattern.description}`);
        console.log(`💡 Suggested fix: ${pattern.suggestedFix}`);
        break;
      }
    }
    
    // Try to find the source file
    const sourceFile = await findSourceFileForError(error);
    if (sourceFile) {
      console.log(`📂 Likely source file: ${sourceFile}`);
      
      // Read the file content
      try {
        const fileContent = fs.readFileSync(sourceFile, 'utf8');
        console.log(`📄 File exists and is readable`);
        
        // Here you would implement specific fixes based on the error pattern
        // For now, we'll just suggest manual fixes
        
        // Mark as analyzed
        error.analyzed = true;
        error.sourceFile = sourceFile;
        error.matchedPattern = matchedPattern ? matchedPattern.description : 'Unknown issue';
      } catch (readError) {
        console.log(`❌ Could not read file: ${readError.message}`);
      }
    } else {
      console.log(`❓ Could not determine source file`);
    }
    
    // Mark as analyzed even if we couldn't find the source
    error.analyzed = true;
  }
  
  // Process warnings
  for (const warning of logs.warnings) {
    // Skip warnings we've already processed
    if (warning.analyzed) continue;
    
    console.log(`\n⚠️ WARNING: ${warning.text}`);
    // Similar analysis as for errors could be implemented here
    
    warning.analyzed = true;
  }
}

/**
 * Set up event listeners for the page
 * @param {puppeteer.Page} page - The Puppeteer page object
 */
async function setupPageListeners(page) {
  // Set up console log monitoring
  page.on('console', message => {
    const type = message.type();
    const text = message.text();
    const logEntry = {
      type,
      text,
      timestamp: new Date().toISOString()
    };
    
    logs.console.push(logEntry);
    
    // Categorize logs
    if (type === 'error') {
      logs.errors.push(logEntry);
      console.log(`❌ ERROR: ${text}`);
    } else if (type === 'warning') {
      logs.warnings.push(logEntry);
      console.log(`⚠️ WARNING: ${text}`);
    } else {
      // Only log info and log messages to console to reduce noise
      if (type === 'info' || type === 'log') {
        console.log(`📝 ${type.toUpperCase()}: ${text}`);
      }
    }
  });
  
  // Monitor network requests
  page.on('request', request => {
    logs.network.push({
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType(),
      timestamp: new Date().toISOString(),
      direction: 'request'
    });
  });
  
  page.on('response', response => {
    const status = response.status();
    const responseEntry = {
      url: response.url(),
      status,
      timestamp: new Date().toISOString(),
      direction: 'response'
    };
    
    logs.network.push(responseEntry);
    
    // Log failed network requests
    if (status >= 400) {
      console.log(`🌐 NETWORK ERROR: ${response.url()} (${status})`);
      logs.errors.push({
        type: 'network',
        text: `Failed request to ${response.url()} with status ${status}`,
        timestamp: new Date().toISOString()
      });
    }
  });
  
  // Monitor page errors
  page.on('pageerror', error => {
    const errorEntry = {
      type: 'pageerror',
      text: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    };
    
    logs.errors.push(errorEntry);
    console.log(`💥 PAGE ERROR: ${error.message}`);
  });
  
  // Monitor WebSocket frames (requires CDP session)
  const client = await page.target().createCDPSession();
  await client.send('Network.enable');
  
  client.on('Network.webSocketFrameReceived', params => {
    try {
      const data = JSON.parse(params.response.payloadData);
      logs.network.push({
        type: 'websocket',
        direction: 'received',
        data,
        timestamp: new Date().toISOString()
      });
      console.log(`🔄 WEBSOCKET RECEIVED: ${params.response.payloadData.substring(0, 100)}${params.response.payloadData.length > 100 ? '...' : ''}`);
    } catch (e) {
      // Not JSON data, just log as text
      logs.network.push({
        type: 'websocket',
        direction: 'received',
        data: params.response.payloadData,
        timestamp: new Date().toISOString()
      });
    }
  });
  
  client.on('Network.webSocketFrameSent', params => {
    try {
      const data = JSON.parse(params.response.payloadData);
      logs.network.push({
        type: 'websocket',
        direction: 'sent',
        data,
        timestamp: new Date().toISOString()
      });
    } catch (e) {
      // Not JSON data, just log as text
      logs.network.push({
        type: 'websocket',
        direction: 'sent',
        data: params.response.payloadData,
        timestamp: new Date().toISOString()
      });
    }
  });
  
  client.on('Network.webSocketClosed', params => {
    logs.network.push({
      type: 'websocket',
      event: 'closed',
      timestamp: new Date().toISOString()
    });
    console.log(`🔌 WEBSOCKET CLOSED`);
    
    // Add to errors if it was unexpected
    logs.errors.push({
      type: 'websocket',
      text: 'WebSocket connection closed unexpectedly',
      timestamp: new Date().toISOString()
    });
  });
  
  client.on('Network.webSocketFrameError', params => {
    logs.errors.push({
      type: 'websocket',
      text: `WebSocket error: ${params.errorMessage}`,
      timestamp: new Date().toISOString()
    });
    console.log(`❌ WEBSOCKET ERROR: ${params.errorMessage}`);
  });
}

/**
 * Navigate to the application with retry logic
 * @param {puppeteer.Page} page - The Puppeteer page object
 * @returns {Promise<boolean>} - Whether the navigation was successful
 */
async function navigateToApp(page) {
  console.log(`🌐 Navigating to ${APP_URL}...`);
  
  try {
    await page.goto(APP_URL, { 
      waitUntil: 'networkidle2', 
      timeout: 60000 // 60 seconds timeout
    });
    console.log('✅ Page loaded successfully');
    return true;
  } catch (error) {
    console.log(`❌ Failed to load page: ${error.message}`);
    return false;
  }
}

/**
 * Open Chrome DevTools programmatically
 * @param {puppeteer.Page} page - The Puppeteer page object
 */
async function openDevTools(page) {
  await page.evaluate(() => {
    console.log('DevTools Inspector: Monitoring started');
    // This would normally trigger DevTools to open, but in headful mode
    // we'll rely on the user to open DevTools manually if needed
  });
}

/**
 * Save logs to file
 */
function saveLogs() {
  try {
    fs.writeFileSync(LOG_FILE_PATH, JSON.stringify(logs, null, 2));
    console.log(`📊 Logs saved to ${LOG_FILE_PATH}`);
  } catch (saveError) {
    console.error(`❌ Failed to save logs: ${saveError.message}`);
  }
}

/**
 * Clean up resources
 */
async function cleanup() {
  // Save logs
  saveLogs();
  
  // Clear intervals
  if (analysisInterval) {
    clearInterval(analysisInterval);
    analysisInterval = null;
  }
  
  // Close browser if it's open
  if (browser) {
    await browser.close();
    browser = null;
  }
  
  isMonitoring = false;
  console.log('🏁 Browser monitoring completed');
}

/**
 * Handle process exit
 */
process.on('SIGINT', async () => {
  console.log('\n🛑 Received interrupt signal, shutting down...');
  cleanExitRequested = true;
  await cleanup();
  process.exit(0);
});

/**
 * Start monitoring the application
 */
async function startMonitoring() {
  if (isMonitoring) {
    console.log('⚠️ Monitoring is already in progress');
    return;
  }
  
  isMonitoring = true;
  console.log('🚀 Starting Developer Log & Network Inspector Agent...');
  
  try {
    // Launch browser
    browser = await puppeteer.launch({
      headless: false, // Show the browser
      defaultViewport: null, // Use default viewport
      args: ['--window-size=1280,800', '--auto-open-devtools-for-tabs']
    });
    
    // Open a new page
    page = await browser.newPage();
    
    // Set up event listeners
    await setupPageListeners(page);
    
    // Navigate to the app
    const navigationSuccessful = await navigateToApp(page);
    if (!navigationSuccessful) {
      console.log('⚠️ Will continue monitoring but some features may not work correctly');
    }
    
    // Open DevTools
    await openDevTools(page);
    
    // Set up periodic log analysis
    analysisInterval = setInterval(analyzeLogs, ANALYSIS_INTERVAL);
    
    // Set up a maximum monitoring time
    setTimeout(async () => {
      if (isMonitoring && !cleanExitRequested) {
        console.log(`⏱️ Maximum monitoring time (${MAX_MONITORING_TIME / 60000} minutes) reached`);
        await cleanup();
      }
    }, MAX_MONITORING_TIME);
    
    console.log('👀 Monitoring started - Press Ctrl+C to stop');
    
  } catch (error) {
    console.error('❌ Failed to start monitoring:', error);
    isMonitoring = false;
    
    // Add the error to logs
    logs.errors.push({
      type: 'monitoring_error',
      text: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    
    await cleanup();
  }
}

// Start the monitoring process
startMonitoring().catch(error => {
  console.error('❌ Fatal error:', error);
  cleanup().catch(cleanupError => {
    console.error('❌ Error during cleanup:', cleanupError);
  });
});