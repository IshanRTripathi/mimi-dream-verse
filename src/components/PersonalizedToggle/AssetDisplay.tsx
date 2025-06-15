
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
  console.log('AssetDisplay rendering with imageSrc:', imageSrc);
  
  const handleImageLoad = () => {
    console.log('✅ Image loaded successfully:', imageSrc);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('❌ Image failed to load:', imageSrc, e);
  };

  return (
    <div className="relative">
      <div className={`aspect-square ${gradientColors} rounded-2xl lg:rounded-3xl flex items-center justify-center overflow-hidden shadow-lg`}>
        <img 
          src={imageSrc} 
          alt={alt}
          className="w-full h-full object-cover rounded-2xl lg:rounded-3xl"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
      
      <div className={`absolute -top-2 sm:-top-3 left-2 sm:left-4 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg ${labelGradient}`}>
        {label}
      </div>
    </div>
  );
};
