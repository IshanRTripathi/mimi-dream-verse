
import { AssetDisplay } from './AssetDisplay';
import { AudioPlayer } from './AudioPlayer';
import { FeaturesList } from './FeaturesList';

// Import the images using Vite's import system
import normalAsset from '@/assets/featureImages/normalasset.jpg';
import personalizedAsset from '@/assets/featureImages/personalisedasset.jpg';

interface TabContentProps {
  type: 'normal' | 'personalized';
  shouldStopAudio?: boolean;
}

export const TabContent = ({ type, shouldStopAudio = false }: TabContentProps) => {
  console.log('TabContent rendering with type:', type, 'shouldStopAudio:', shouldStopAudio);
  const isPersonalized = type === 'personalized';
  
  const config = isPersonalized ? {
    imageSrc: personalizedAsset,
    alt: 'Personalized story asset',
    label: 'Personalized',
    imageGradient: 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50',
    labelGradient: 'bg-gradient-to-r from-purple-500 to-pink-500',
    title: '🎙️ Realistic Voice',
    description: 'Hear the story with realistic tone',
    sampleText: 'Once upon a time, little Emma discovered a magical garden where butterflies danced and flowers sang beautiful melodies just for her...',
    audioGradient: 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30',
    buttonGradient: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
    features: [
      { text: "Child's name integrated naturally", color: 'bg-purple-400' },
      { text: 'Realistic voice tone technology', color: 'bg-pink-400' },
      { text: 'Custom character appearance', color: 'bg-purple-400' }
    ]
  } : {
    imageSrc: normalAsset,
    alt: 'Normal story asset',
    label: 'Normal',
    imageGradient: 'bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50',
    labelGradient: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    title: '🤖 Normal Tone',
    description: 'Standard AI-generated narration',
    sampleText: 'Once upon a time, there was a brave princess who discovered a magical garden where creatures of wonder awaited her arrival...',
    audioGradient: 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30',
    buttonGradient: 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600',
    features: [
      { text: 'Generic story characters', color: 'bg-blue-400' },
      { text: 'Standard AI narration', color: 'bg-cyan-400' },
      { text: 'Standard illustrations', color: 'bg-blue-400' }
    ]
  };

  console.log('TabContent config imageSrc:', config.imageSrc);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
      <AssetDisplay
        imageSrc={config.imageSrc}
        alt={config.alt}
        label={config.label}
        gradientColors={config.imageGradient}
        labelGradient={config.labelGradient}
      />

      <div className="space-y-4 sm:space-y-6">
        <AudioPlayer
          audioType={type}
          title={config.title}
          description={config.description}
          sampleText={config.sampleText}
          gradientColors={config.audioGradient}
          buttonGradient={config.buttonGradient}
          shouldStop={shouldStopAudio}
        />
        <FeaturesList features={config.features} />
      </div>
    </div>
  );
};
