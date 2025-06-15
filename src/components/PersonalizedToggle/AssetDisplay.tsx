
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
  return (
    <div className="relative">
      <div className={`aspect-square ${gradientColors} rounded-2xl lg:rounded-3xl flex items-center justify-center overflow-hidden shadow-lg`}>
        <img 
          src={imageSrc} 
          alt={alt}
          className="w-full h-full object-cover rounded-2xl lg:rounded-3xl"
        />
      </div>
      
      <div className={`absolute -top-2 sm:-top-3 left-2 sm:left-4 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg ${labelGradient}`}>
        {label}
      </div>
    </div>
  );
};
