
# Asset Migration Scripts

These scripts automatically move assets from `src/assets/` to the `public/` folder to ensure they're accessible at runtime.

## Scripts

### `move-assets.js`
Copies all files from `src/assets/` to `public/` while preserving directory structure.

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
- `src/assets/featureImages/normalasset.jpg` → `public/normalasset.jpg`
- `src/assets/featureImages/personalisedasset.jpg` → `public/personalisedasset.jpg`

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
