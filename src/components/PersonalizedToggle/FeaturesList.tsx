
interface Feature {
  text: string;
  color: string;
}

interface FeaturesListProps {
  features: Feature[];
}

export const FeaturesList = ({ features }: FeaturesListProps) => {
  return (
    <div className="space-y-1 sm:space-y-2">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <span className={`w-2 h-2 ${feature.color} rounded-full flex-shrink-0`}></span>
          {feature.text}
        </div>
      ))}
    </div>
  );
};
