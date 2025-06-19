import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const APP_URL = 'http://localhost:9999';
const LOG_FILE_PATH = path.join(__dirname, '..', 'dev-logs.json');
const MONITORING_DURATION = 30000; // 30 seconds of monitoring
const PAGE_LOAD_TIMEOUT = 60000; // 60 seconds timeout for page load
const RETRY_ATTEMPTS = 3; // Number of retry attempts for page load

// Initialize log storage
const logs = {
  console: [],
  network: [],
  errors: [],
  warnings: []
};

async function monitorApplication() {
  console.log('🚀 Starting browser monitoring for development logs...');
  
  // Launch browser
  const browser = await puppeteer.launch({
    headless: false, // Show the browser
    defaultViewport: null, // Use default viewport
    args: ['--window-size=1280,800']
  });
  
  try {
    // Open a new page
    const page = await browser.newPage();
    
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
        console.log(`📝 ${type.toUpperCase()}: ${text}`);
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
    
    // Navigate to the application with retry logic
    console.log(`🌐 Navigating to ${APP_URL}...`);
    
    let pageLoaded = false;
    let retryCount = 0;
    
    while (!pageLoaded && retryCount < RETRY_ATTEMPTS) {
      try {
        await page.goto(APP_URL, { 
          waitUntil: 'networkidle2', 
          timeout: PAGE_LOAD_TIMEOUT 
        });
        pageLoaded = true;
        console.log('✅ Page loaded successfully');
      } catch (error) {
        retryCount++;
        console.log(`⚠️ Page load attempt ${retryCount}/${RETRY_ATTEMPTS} failed: ${error.message}`);
        
        if (retryCount < RETRY_ATTEMPTS) {
          console.log('Retrying in 5 seconds...');
          await new Promise(resolve => setTimeout(resolve, 5000));
        } else {
          console.log('❌ Failed to load page after multiple attempts');
          // Continue with monitoring anyway to capture any errors
        }
      }
    }
    
    // Open DevTools programmatically
    await page.evaluate(() => {
      console.log('DevTools Inspector: Monitoring started');
    });
    
    // Monitor for a set duration
    console.log(`⏱️ Monitoring for ${MONITORING_DURATION / 1000} seconds...`);
    await new Promise(resolve => setTimeout(resolve, MONITORING_DURATION));
    
    // Save logs to file
    fs.writeFileSync(LOG_FILE_PATH, JSON.stringify(logs, null, 2));
    console.log(`📊 Logs saved to ${LOG_FILE_PATH}`);
    
    // Summary of findings
    console.log('\n📋 MONITORING SUMMARY:');
    console.log(`Total console logs: ${logs.console.length}`);
    console.log(`Total network requests: ${logs.network.length}`);
    console.log(`Errors detected: ${logs.errors.length}`);
    console.log(`Warnings detected: ${logs.warnings.length}`);
    
    if (logs.errors.length > 0) {
      console.log('\n❌ ERRORS DETECTED:');
      logs.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error.text}`);
      });
    }
    
    if (logs.warnings.length > 0) {
      console.log('\n⚠️ WARNINGS DETECTED:');
      logs.warnings.forEach((warning, index) => {
        console.log(`${index + 1}. ${warning.text}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Monitoring failed:', error);
    
    // Add the error to logs
    logs.errors.push({
      type: 'monitoring_error',
      text: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  } finally {
    // Always save logs to file, even if there were errors
    try {
      // Make sure we have at least some data to save
      if (logs.console.length === 0 && logs.network.length === 0 && logs.errors.length === 0 && logs.warnings.length === 0) {
        logs.errors.push({
          type: 'monitoring_info',
          text: 'No logs were collected during the monitoring session',
          timestamp: new Date().toISOString()
        });
      }
      
      fs.writeFileSync(LOG_FILE_PATH, JSON.stringify(logs, null, 2));
      console.log(`📊 Logs saved to ${LOG_FILE_PATH}`);
    } catch (saveError) {
      console.error(`❌ Failed to save logs: ${saveError.message}`);
    }
    
    // Close the browser
    await browser.close();
    console.log('🏁 Browser monitoring completed');
  }
}

// Run the monitoring function
monitorApplication().catch(error => {
  console.error('❌ Fatal error:', error);
});