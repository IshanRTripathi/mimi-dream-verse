
# Centralized Asset Migration Scripts

These scripts automatically move assets from the centralized `src/assets/` structure to the `public/` folder to ensure they're accessible at runtime.

## New Centralized Structure

All assets are now organized in a single, centralized folder structure:

```
src/assets/
├── audio/           # All audio files (.mp3, .wav, .ogg)
├── images/          # All image files (.jpg, .jpeg, .png, .gif, .webp)
└── animations/      # All animation files (.json, .lottie)
```

## Scripts

### `move-assets.js`
Copies all files from the centralized `src/assets/` structure to `public/` while maintaining file organization by type.

**Usage:**
```bash
node scripts/move-assets.js
```

### `build-with-assets.js`
Runs asset migration before building the application.

**Usage:**
```bash
node scripts/build-with-assets.js
```

### `dev-with-assets.js`
Runs asset migration before starting the development server.

**Usage:**
```bash
node scripts/dev-with-assets.js
```

## File Mapping

The script will copy files like this:
- `src/assets/audio/bgmusic.mp3` → `public/bgmusic.mp3`
- `src/assets/images/normalasset.jpg` → `public/normalasset.jpg`
- `src/assets/images/personalisedasset.jpg` → `public/personalisedasset.jpg`
- `src/assets/animations/mimi-animation.json` → `public/mimi-animation.json`

## Asset Management

All assets are centrally managed through the `AssetManager` utility:
- Direct imports from the centralized structure
- Type-safe asset access
- Centralized configuration for volumes, fallbacks, etc.
- Consistent logging and error handling

## Integration with Package.json

To integrate these scripts with your package.json, add these scripts:

```json
{
  "scripts": {
    "prebuild": "node scripts/move-assets.js",
    "predev": "node scripts/move-assets.js",
    "build:assets": "node scripts/build-with-assets.js",
    "dev:assets": "node scripts/dev-with-assets.js"
  }
}
```

## Automatic Execution

If you want assets to be moved automatically:
1. Use `npm run build:assets` instead of `npm run build`
2. Use `npm run dev:assets` instead of `npm run dev`

Or add the `prebuild` and `predev` scripts to your package.json to run automatically.
