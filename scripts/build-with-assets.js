
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
  console.log('🚀 Starting build process with asset migration...');
  
  // Step 1: Move assets to public folder
  runCommand('node scripts/move-assets.js', 'Moving assets to public folder');
  
  // Step 2: Run the actual build
  runCommand('npm run build', 'Building the application');
  
  console.log('🎉 Build process completed successfully!');
}

main();
