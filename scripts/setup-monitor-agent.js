import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PACKAGE_JSON_PATH = path.join(__dirname, '..', 'package.json');

/**
 * Check if a dependency is installed
 * @param {string} dependency - The dependency name
 * @returns {boolean} - Whether the dependency is installed
 */
async function isDependencyInstalled(dependency) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
    return (
      (packageJson.dependencies && packageJson.dependencies[dependency]) ||
      (packageJson.devDependencies && packageJson.devDependencies[dependency])
    );
  } catch (error) {
    console.error(`Error checking for dependency ${dependency}:`, error.message);
    return false;
  }
}

/**
 * Install missing dependencies
 */
async function installDependencies() {
  const dependencies = ['puppeteer'];
  const missingDependencies = [];
  
  for (const dependency of dependencies) {
    if (!(await isDependencyInstalled(dependency))) {
      missingDependencies.push(dependency);
    }
  }
  
  if (missingDependencies.length > 0) {
    console.log(`📦 Installing missing dependencies: ${missingDependencies.join(', ')}`);
    try {
      await execAsync(`npm install --save-dev ${missingDependencies.join(' ')}`);
      console.log('✅ Dependencies installed successfully');
    } catch (error) {
      console.error('❌ Failed to install dependencies:', error.message);
      throw new Error('Failed to install dependencies');
    }
  } else {
    console.log('✅ All required dependencies are already installed');
  }
}

/**
 * Add scripts to package.json
 */
async function addScripts() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
    
    // Scripts to add
    const scripts = {
      'monitor': 'node scripts/dev-log-monitor-agent.js',
      'dev:monitor': 'npm run dev & npm run monitor'
    };
    
    let scriptsAdded = false;
    
    // Add scripts if they don't exist
    for (const [name, command] of Object.entries(scripts)) {
      if (!packageJson.scripts[name]) {
        packageJson.scripts[name] = command;
        scriptsAdded = true;
      }
    }
    
    if (scriptsAdded) {
      // Write updated package.json
      fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2));
      console.log('✅ Scripts added to package.json');
    } else {
      console.log('✅ All required scripts are already in package.json');
    }
  } catch (error) {
    console.error('❌ Failed to update package.json:', error.message);
    throw new Error('Failed to update package.json');
  }
}

/**
 * Main setup function
 */
async function setup() {
  console.log('🔧 Setting up Developer Log & Network Inspector Agent...');
  
  try {
    // Install dependencies
    await installDependencies();
    
    // Add scripts to package.json
    await addScripts();
    
    console.log('\n🎉 Setup completed successfully!');
    console.log('\nYou can now run the following commands:');
    console.log('  npm run monitor    - Start the monitoring agent');
    console.log('  npm run dev:monitor - Start both the dev server and monitoring agent');
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run setup
setup();