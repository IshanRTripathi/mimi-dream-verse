/**
 * Static Asset Manager
 * 
 * A simplified approach to managing static assets from the public directory.
 * This eliminates the need for importing assets in the code and simplifies the asset loading logic.
 */

// Define asset types for better type checking
export type AudioType = 'normal' | 'personalized';
export type ImageCategory = 'features' | 'interactive';

// Simple utility to get the correct public URL for assets
const getPublicAssetUrl = (path: string): string => {
  // Ensure path starts with a slash for proper public directory reference
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }
  return path;
};

// Simplified asset manager that references files directly from public directory
export const StaticAssetManager = {
  // Audio assets
  audio: {
    // Audio files
    normalTone: '/normaltone.mp3',
    realisticTone: '/realistictone.mp3',
    bgMusic: '/bgmusic.mp3',
    
    // Helper functions
    getStoryAudio: (type: AudioType): string => {
      console.log(`Getting story audio for type: ${type}`);
      return type === 'personalized' ? '/realistictone.mp3' : '/normaltone.mp3';
    },
    getBackgroundMusic: (): string => '/bgmusic.mp3',
    
    // Volume levels
    volumes: {
      backgroundMusic: 0.3,
      narration: 0.5,
      uiSounds: 0.2,
    },
  },

  // Image assets
  images: {
    // Feature images
    features: {
      normalAsset: '/normalasset.jpg',
      personalizedAsset: '/personalisedasset.jpg',
    },
    
    // Interactive feature images
    interactive: {
      accessibility1: '/accessibility1.jpg',
      accessibility2: '/accessibility2.jpg',
      values1: '/values1.jpeg',
      values2: '/values2.jpeg',
      alive1: '/alive1.jpg',
      alive2: '/alive2.jpg',
      imagine1: '/imagine1.jpg',
      imagine2: '/imagine2.jpg',
    },
    
    // Helper function to get image by path
    getByPath: (imagePath: string): string => {
      // If it's already a URL, return as is
      if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
        return imagePath;
      }
      
      // Extract just the filename from the path
      const filename = imagePath.split('/').pop();
      if (filename) {
        // Return path relative to public directory
        return `/${filename}`;
      }
      
      // Fallback to original path if we can't resolve it
      return getPublicAssetUrl(imagePath);
    }
  },

  // Animation assets
  animations: {
    mimi: '/mimi-animation.json',
    arrow: '/arrow-animation.json',
  },

  // Asset utility functions
  utils: {
    // Check if asset is available
    isAssetAvailable: (assetPath: string): boolean => {
      return assetPath !== null && assetPath !== undefined && assetPath !== '';
    },

    // Get asset with fallback
    getAssetWithFallback: (primaryAsset: string, fallbackAsset: string): string => {
      return StaticAssetManager.utils.isAssetAvailable(primaryAsset) ? primaryAsset : fallbackAsset;
    },

    // Log asset loading
    logAssetLoad: (assetType: string, assetName: string, success: boolean) => {
      const emoji = success ? '✅' : '❌';
      console.log(`${emoji} ${assetType} asset: ${assetName}`);
    }
  }
};

// Export individual categories for convenience
export const { audio, images, animations, utils } = StaticAssetManager;

// Export the main manager as default
export default StaticAssetManager;