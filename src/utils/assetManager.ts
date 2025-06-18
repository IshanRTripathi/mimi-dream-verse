
// Centralized asset management system
// Import all assets from the new centralized structure

// Audio assets from centralized folder
import normalTone from '@/assets/audio/normaltone.mp3';
import realisticTone from '@/assets/audio/realistictone.mp3';
import bgMusic from '@/assets/audio/bgmusic.mp3';

// Image assets from centralized folder
import normalAsset from '@/assets/images/normalasset.jpg';
import personalizedAsset from '@/assets/images/personalisedasset.jpg';
import accessibility1 from '@/assets/images/accessibility1.jpg';
import accessibility2 from '@/assets/images/accessibility2.jpg';
import values1 from '@/assets/images/values1.jpeg';
import values2 from '@/assets/images/values2.jpeg';
import alive1 from '@/assets/images/alive1.jpg';
import alive2 from '@/assets/images/alive2.jpg';
import imagine1 from '@/assets/images/imagine1.jpg';
import imagine2 from '@/assets/images/imagine2.jpg';

// Animation assets from centralized folder
import mimiAnimation from '@/assets/animations/mimi-animation.json';
import arrowAnimation from '@/assets/animations/arrow-animation.json';

export const AssetManager = {
  // Audio assets
  audio: {
    normalTone,
    realisticTone,
    bgMusic,
    // Audio configuration
    getStoryAudio: (type: 'normal' | 'personalized') => {
      console.log(`Getting story audio for type: ${type}`);
      return type === 'personalized' ? realisticTone : normalTone;
    },
    getBackgroundMusic: () => bgMusic,
    // Volume levels
    volumes: {
      backgroundMusic: 0.3,
      narration: 0.5,
      uiSounds: 0.2,
    },
    // Audio playback state tracking
    currentlyPlaying: {
      normal: false,
      personalized: false,
      background: false
    }
  },

  // Image assets
  images: {
    features: {
      normalAsset,
      personalizedAsset,
    },
    interactive: {
      accessibility1,
      accessibility2,
      values1,
      values2,
      alive1,
      alive2,
      imagine1,
      imagine2,
    },
    // Helper function to get image by path
    getByPath: (imagePath: string): string => {
      // Map source paths to imported assets
      const sourcePathMap: Record<string, string> = {
        '/src/assets/images/accessibility1.jpg': accessibility1,
        '/src/assets/images/accessibility2.jpg': accessibility2,
        '/src/assets/images/values1.jpeg': values1,
        '/src/assets/images/values2.jpeg': values2,
        '/src/assets/images/alive1.jpg': alive1,
        '/src/assets/images/alive2.jpg': alive2,
        '/src/assets/images/imagine1.jpg': imagine1,
        '/src/assets/images/imagine2.jpg': imagine2,
      };
      
      // If the path is in our map, return the imported asset
      if (sourcePathMap[imagePath]) {
        return sourcePathMap[imagePath];
      }
      
      // Otherwise, try to resolve the path relative to the public directory
      // Extract just the filename from the path
      const filename = imagePath.split('/').pop();
      if (filename) {
        // Return path relative to public directory
        return `/${filename}`;
      }
      
      // Fallback to original path if we can't resolve it
      return imagePath;
    }
  },

  // Animation assets
  animations: {
    mimi: mimiAnimation,
    arrow: arrowAnimation,
  },

  // Asset loading utilities
  utils: {
    // Check if asset is available
    isAssetAvailable: (assetPath: string): boolean => {
      try {
        return assetPath !== null && assetPath !== undefined && assetPath !== '';
      } catch {
        return false;
      }
    },

    // Get asset with fallback
    getAssetWithFallback: (primaryAsset: string, fallbackAsset: string): string => {
      return AssetManager.utils.isAssetAvailable(primaryAsset) ? primaryAsset : fallbackAsset;
    },

    // Log asset loading
    logAssetLoad: (assetType: string, assetName: string, success: boolean) => {
      const emoji = success ? '✅' : '❌';
      console.log(`${emoji} ${assetType} asset: ${assetName}`);
    }
  }
};

// Export individual categories for convenience
export const { audio, images, animations, utils } = AssetManager;

// Type definitions
export type AssetType = 'audio' | 'image' | 'animation';
export type AudioType = 'normal' | 'personalized';
export type ImageCategory = 'features' | 'interactive';
