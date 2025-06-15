
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Updated source directories for centralized structure
const audioSourceDir = path.join(__dirname, '..', 'src', 'assets', 'audio');
const imageSourceDir = path.join(__dirname, '..', 'src', 'assets', 'images');
const animationSourceDir = path.join(__dirname, '..', 'src', 'assets', 'animations');
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

function moveAssetsFromDirectory(srcDir, destDir, fileExtensions = []) {
  if (!fs.existsSync(srcDir)) {
    console.log(`⚠️  Source directory not found: ${srcDir}`);
    return;
  }

  const items = fs.readdirSync(srcDir);

  items.forEach(item => {
    const sourcePath = path.join(srcDir, item);
    const stat = fs.statSync(sourcePath);

    if (stat.isFile()) {
      // Check if file has allowed extension (if specified)
      const fileExt = path.extname(item).toLowerCase();
      if (fileExtensions.length === 0 || fileExtensions.includes(fileExt)) {
        const targetPath = path.join(destDir, item);
        copyFile(sourcePath, targetPath);
      }
    }
  });
}

function main() {
  console.log('🚀 Starting centralized asset migration...');
  console.log(`📂 Audio source: ${audioSourceDir}`);
  console.log(`📂 Image source: ${imageSourceDir}`);
  console.log(`📂 Animation source: ${animationSourceDir}`);
  console.log(`📂 Target: ${targetDir}`);
  
  // Ensure target directory exists
  ensureDirectoryExists(targetDir);
  
  // Move audio files
  console.log('\n🎵 Moving audio assets...');
  moveAssetsFromDirectory(audioSourceDir, targetDir, ['.mp3', '.wav', '.ogg']);
  
  // Move image files
  console.log('\n🖼️  Moving image assets...');
  moveAssetsFromDirectory(imageSourceDir, targetDir, ['.jpg', '.jpeg', '.png', '.gif', '.webp']);
  
  // Move animation files
  console.log('\n🎬 Moving animation assets...');
  moveAssetsFromDirectory(animationSourceDir, targetDir, ['.json', '.lottie']);
  
  console.log('\n✨ Centralized asset migration completed!');
  console.log('\n📋 Asset organization:');
  console.log('   • Audio files: src/assets/audio/ → public/');
  console.log('   • Image files: src/assets/images/ → public/');
  console.log('   • Animation files: src/assets/animations/ → public/');
}

main();
