
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '..', 'src', 'assets');
const targetDir = path.join(__dirname, '..', 'public');

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
}

function copyFile(source, target) {
  try {
    fs.copyFileSync(source, target);
    console.log(`✅ Copied: ${path.relative(process.cwd(), source)} → ${path.relative(process.cwd(), target)}`);
  } catch (error) {
    console.error(`❌ Failed to copy ${source}:`, error.message);
  }
}

function moveAssets(srcDir, destDir, basePath = '') {
  if (!fs.existsSync(srcDir)) {
    console.log(`⚠️  Source directory not found: ${srcDir}`);
    return;
  }

  const items = fs.readdirSync(srcDir);

  items.forEach(item => {
    const sourcePath = path.join(srcDir, item);
    const targetPath = path.join(destDir, basePath, item);
    const stat = fs.statSync(sourcePath);

    if (stat.isDirectory()) {
      // Recursively copy directories
      ensureDirectoryExists(path.join(destDir, basePath, item));
      moveAssets(sourcePath, destDir, path.join(basePath, item));
    } else {
      // Copy files
      ensureDirectoryExists(path.dirname(targetPath));
      copyFile(sourcePath, targetPath);
    }
  });
}

function main() {
  console.log('🚀 Starting asset migration...');
  console.log(`📂 Source: ${sourceDir}`);
  console.log(`📂 Target: ${targetDir}`);
  
  // Ensure target directory exists
  ensureDirectoryExists(targetDir);
  
  // Move all assets
  moveAssets(sourceDir, targetDir);
  
  console.log('✨ Asset migration completed!');
}

main();
