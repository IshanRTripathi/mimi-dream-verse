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
  
  // In production, we need to use the PUBLIC_URL environment variable if available
  // This ensures assets are loaded correctly when the app is deployed to a subdirectory
  const publicUrl = import.meta.env.PROD ? '' : '';
  return `${publicUrl}${path}`;
};

// Simplified asset manager that references files directly from public directory
export const StaticAssetManager = {
  // Audio assets
  audio: {
    // Audio files
    normalTone: '/audio/normaltone.mp3',
    realisticTone: '/audio/realistictone.mp3',
    bgMusic: '/audio/bgmusic.mp3',
    
    // Helper functions
    getStoryAudio: (type: AudioType): string => {
      console.log(`Getting story audio for type: ${type}`);
      return type === 'personalized' ? '/audio/realistictone.mp3' : '/audio/normaltone.mp3';
    },
    getBackgroundMusic: (): string => '/audio/bgmusic.mp3',
    
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
      normalAsset: '/images/normalasset.jpg',
      personalizedAsset: '/images/personalisedasset.jpg',
    },
    
    // Interactive feature images
    interactive: {
      accessibility1: '/images/accessibility1.jpg',
      accessibility2: '/images/accessibility2.jpg',
      values1: '/images/values1.jpeg',
      values2: '/images/values2.jpeg',
      alive1: '/images/alive1.jpg',
      alive2: '/images/alive2.jpg',
      imagine1: '/images/imagine1.jpg',
      imagine2: '/images/imagine2.jpg',
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
        // Return path relative to public directory with images subdirectory
        return getPublicAssetUrl(`/images/${filename}`);
      }
      
      // Fallback to original path if we can't resolve it
      return getPublicAssetUrl(imagePath);
    }
  },

  // Animation assets
  animations: {
    mimi: '/animations/mimi-animation.json',
    arrow: '/animations/arrow-animation.json',
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