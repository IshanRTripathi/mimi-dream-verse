import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the public directory and subdirectories
const publicDir = path.join(__dirname, '..', 'public');
const audioDir = path.join(publicDir, 'audio');
const imagesDir = path.join(publicDir, 'images');
const animationsDir = path.join(publicDir, 'animations');

// File extensions by type
const fileTypes = {
  audio: ['.mp3', '.wav', '.ogg'],
  images: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
  animations: ['.json', '.lottie']
};

// Create directories if they don't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
}

// Move a file to its appropriate directory based on extension
function moveFileToTypeDirectory(file, sourceDir, destDir) {
  const sourcePath = path.join(sourceDir, file);
  const destPath = path.join(destDir, file);
  
  try {
    // Only process files (not directories)
    if (fs.statSync(sourcePath).isFile()) {
      // Copy the file to the destination
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✅ Moved: ${path.relative(process.cwd(), sourcePath)} → ${path.relative(process.cwd(), destPath)}`);
    }
  } catch (error) {
    console.error(`❌ Failed to move ${sourcePath}:`, error.message);
  }
}

// Organize files in the public directory
function organizePublicDirectory() {
  console.log('🚀 Starting public directory organization...');
  
  // Ensure subdirectories exist
  ensureDirectoryExists(audioDir);
  ensureDirectoryExists(imagesDir);
  ensureDirectoryExists(animationsDir);
  
  // Get all files in the public directory
  const files = fs.readdirSync(publicDir);
  
  // Process each file
  files.forEach(file => {
    const filePath = path.join(publicDir, file);
    
    // Skip directories and special files
    if (fs.statSync(filePath).isDirectory() || file === 'favicon.ico' || file === 'robots.txt') {
      return;
    }
    
    const ext = path.extname(file).toLowerCase();
    
    // Move file to appropriate directory based on extension
    if (fileTypes.audio.includes(ext)) {
      moveFileToTypeDirectory(file, publicDir, audioDir);
    } else if (fileTypes.images.includes(ext)) {
      moveFileToTypeDirectory(file, publicDir, imagesDir);
    } else if (fileTypes.animations.includes(ext)) {
      moveFileToTypeDirectory(file, publicDir, animationsDir);
    } else {
      console.log(`⚠️ Skipping file with unknown type: ${file}`);
    }
  });
  
  console.log('\n✨ Public directory organization completed!');
  console.log('\n📋 New asset organization:');
  console.log('   • Audio files: public/audio/');
  console.log('   • Image files: public/images/');
  console.log('   • Animation files: public/animations/');
}

// Run the organization process
organizePublicDirectory();