import { execSync, spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const DEV_SERVER_PORT = 9999;
const MONITORING_DURATION = 30000; // 30 seconds
const MAX_RETRIES = 3;

// Paths
const PROJECT_ROOT = path.join(__dirname, '..');
const LOG_FILE_PATH = path.join(PROJECT_ROOT, 'dev-logs.json');

// Function to check if port is in use
function isPortInUse(port) {
  try {
    // This command will fail if the port is not in use
    execSync(`netstat -ano | findstr :${port}`, { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Function to kill process using a specific port
function killProcessOnPort(port) {
  try {
    const output = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
    const lines = output.split('\n');
    
    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      if (parts.length > 4 && parts[1].includes(`:${port}`)) {
        const pid = parts[4];
        console.log(`Killing process with PID ${pid} on port ${port}`);
        execSync(`taskkill /F /PID ${pid}`);
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error(`Failed to kill process on port ${port}:`, error.message);
    return false;
  }
}

// Function to run a command and return a promise
function runCommand(command, args, options = {}) {
  // On Windows, we need to use 'npx.cmd' instead of 'npm'
  const isWindows = process.platform === 'win32';
  const npmCommand = isWindows ? 'npx.cmd' : 'npm';
  
  return new Promise((resolve, reject) => {
    const process = spawn(command === 'npm' ? npmCommand : command, args, {
      ...options,
      stdio: 'inherit',
      shell: isWindows // Use shell on Windows
    });
    
    process.on('close', code => {
      if (code === 0 || options.ignoreExitCode) {
        resolve(code);
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
    
    process.on('error', error => {
      reject(error);
    });
  });
}

// Main function
async function main() {
  console.log('🚀 Starting Development Log Monitor');
  
  // Step 1: Check if port is already in use
  if (isPortInUse(DEV_SERVER_PORT)) {
    console.log(`⚠️ Port ${DEV_SERVER_PORT} is already in use. Attempting to free it...`);
    const killed = killProcessOnPort(DEV_SERVER_PORT);
    
    if (!killed) {
      console.error(`❌ Failed to free port ${DEV_SERVER_PORT}. Please close the application using this port manually.`);
      process.exit(1);
    }
  }
  
  try {
    // Step 2: Start the development server in the background
    console.log('🌐 Starting development server...');
    const isWindows = process.platform === 'win32';
    const npmCommand = isWindows ? 'npx.cmd' : 'npm';
    
    const devServer = spawn(npmCommand, ['vite'], {
      cwd: PROJECT_ROOT,
      stdio: 'pipe',
      detached: true,
      shell: isWindows // Use shell on Windows
    });
    
    // Capture server output
    let serverOutput = '';
    devServer.stdout.on('data', data => {
      const output = data.toString();
      serverOutput += output;
      console.log(output);
    });
    
    devServer.stderr.on('data', data => {
      const output = data.toString();
      serverOutput += output;
      console.error(output);
    });
    
    // Wait for server to start
    console.log('⏳ Waiting for development server to start...');
    let retries = 0;
    let serverStarted = false;
    
    while (retries < MAX_RETRIES && !serverStarted) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      
      try {
        // Check if server is responding
        execSync(`curl -s -o /dev/null -w "%{http_code}" http://localhost:${DEV_SERVER_PORT}`, { stdio: 'ignore' });
        serverStarted = true;
      } catch (error) {
        retries++;
        console.log(`Waiting for server (attempt ${retries}/${MAX_RETRIES})...`);
      }
    }
    
    if (!serverStarted) {
      throw new Error('Development server failed to start');
    }
    
    console.log('✅ Development server started successfully');
    
    // Step 3: Run the browser monitoring script
    console.log('🔍 Starting browser monitoring...');
    await runCommand('node', ['scripts/dev-log-inspector.js'], { cwd: PROJECT_ROOT });
    
    // Step 4: Analyze the logs
    console.log('📊 Analyzing logs...');
    await runCommand('node', ['scripts/log-analyzer.js'], { cwd: PROJECT_ROOT });
    
    // Step 5: Clean up
    console.log('🧹 Cleaning up...');
    
    // Kill the development server
    if (devServer.pid) {
      process.kill(-devServer.pid, 'SIGINT');
    }
    
    // Also try to kill by port just to be sure
    killProcessOnPort(DEV_SERVER_PORT);
    
    console.log('✅ Development log monitoring completed');
    
  } catch (error) {
    console.error('❌ Error during log monitoring:', error.message);
    
    // Attempt to clean up
    killProcessOnPort(DEV_SERVER_PORT);
  }
}

// Run the main function
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});