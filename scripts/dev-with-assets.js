
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runCommand(command, description) {
  console.log(`🔧 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    console.log(`✅ ${description} completed successfully`);
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    process.exit(1);
  }
}

function main() {
  console.log('🚀 Starting development server with asset migration and organization...');
  
  // Step 1: Move assets to public folder
  runCommand('node scripts/move-assets.js', 'Moving assets to public folder');
  
  // Step 2: Organize assets in public folder
  runCommand('node scripts/organize-public-assets.js', 'Organizing assets in public folder');
  
  // Step 3: Start the dev server
  runCommand('npm run dev', 'Starting development server');
}

main();
