
# Simplified Asset Management System

These scripts manage static assets in a simplified folder structure within the `public/` directory, making them easily accessible at runtime.

## New Simplified Structure

Assets are now organized in a clean, type-based directory structure within the public folder:

```
public/
├── audio/           # All audio files (.mp3, .wav, .ogg)
├── images/          # All image files (.jpg, .jpeg, .png, .gif, .webp)
└── animations/      # All animation files (.json, .lottie)
```

## Scripts

### `move-assets.js`
Copies all files from the centralized `src/assets/` structure to their respective subdirectories in `public/`.

**Usage:**
```bash
node scripts/move-assets.js
```

### `organize-public-assets.js`
Organizes existing files in the public directory into the appropriate subdirectories based on file type.

**Usage:**
```bash
node scripts/organize-public-assets.js
```

### `build-with-assets.js`
Runs asset migration and organization before building the application.

**Usage:**
```bash
node scripts/build-with-assets.js
```

### `dev-with-assets.js`
Runs asset migration and organization before starting the development server.

**Usage:**
```bash
node scripts/dev-with-assets.js
```

## File Mapping

The scripts will organize files like this:
- `src/assets/audio/bgmusic.mp3` → `public/audio/bgmusic.mp3`
- `src/assets/images/normalasset.jpg` → `public/images/normalasset.jpg`
- `src/assets/images/personalisedasset.jpg` → `public/images/personalisedasset.jpg`
- `src/assets/animations/mimi-animation.json` → `public/animations/mimi-animation.json`

## Asset Access

Assets are now accessed using simple path references:

```javascript
// Audio example
const audioPath = '/audio/bgmusic.mp3';

// Image example
const imagePath = '/images/normalasset.jpg';

// Animation example
const animationPath = '/animations/mimi-animation.json';
```

The new `staticAssetManager.ts` utility provides a clean interface for accessing these assets with proper typing and helper functions.
