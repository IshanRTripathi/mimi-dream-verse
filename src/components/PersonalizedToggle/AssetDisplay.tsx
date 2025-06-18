
import { useState, useEffect } from 'react';
import { StaticAssetManager } from '@/utils/staticAssetManager';

interface AssetDisplayProps {
  imageSrc: string;
  alt: string;
  label: string;
  gradientColors: string;
  labelGradient: string;
}

export const AssetDisplay = ({ 
  imageSrc, 
  alt, 
  label, 
  gradientColors,
  labelGradient 
}: AssetDisplayProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Ensure image path is properly resolved
  const [resolvedImageSrc, setResolvedImageSrc] = useState(imageSrc);
  
  useEffect(() => {
    // Try to resolve the image path if it's not already a full URL
    if (!imageSrc.startsWith('http') && !imageSrc.startsWith('data:')) {
      // If the image path doesn't include the public directory prefix, add it
      if (!imageSrc.startsWith('/')) {
        setResolvedImageSrc(`/${imageSrc}`);
      }
    }
    console.log('AssetDisplay rendering with imageSrc:', imageSrc, 'resolved to:', resolvedImageSrc);
  }, [imageSrc]);
  
  const handleImageLoad = () => {
    console.log('✅ Image loaded successfully:', resolvedImageSrc);
    setImageLoaded(true);
    setImageError(false);
    StaticAssetManager.utils.logAssetLoad('image', resolvedImageSrc, true);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('❌ Image failed to load:', resolvedImageSrc, e);
    setImageError(true);
    setImageLoaded(false);
    StaticAssetManager.utils.logAssetLoad('image', resolvedImageSrc, false);
  };

  return (
    <div className="relative">
      <div className={`aspect-square ${gradientColors} rounded-2xl lg:rounded-3xl flex items-center justify-center overflow-hidden shadow-lg`}>
        {imageError ? (
          <div className="text-center p-4">
            <div className="text-4xl mb-2">🖼️</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Image not found
            </p>
          </div>
        ) : (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img 
              src={resolvedImageSrc} 
              alt={alt}
              className={`w-full h-full object-cover rounded-2xl lg:rounded-3xl transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </>
        )}
      </div>
      
      <div className={`absolute -top-2 sm:-top-3 left-2 sm:left-4 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg ${labelGradient}`}>
        {label}
      </div>
    </div>
  );
};
