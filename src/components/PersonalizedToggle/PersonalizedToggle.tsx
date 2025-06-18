
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabContent } from './TabContent';
import { useAudio } from '@/contexts/AudioContext';

export default function PersonalizedToggle() {
  const [activeTab, setActiveTab] = useState<string>('normal');
  const [shouldStopAudio, setShouldStopAudio] = useState(false);
  const { stopAllAudio } = useAudio();

  const handleTabChange = (value: string) => {
    if (value === activeTab) return;
    
    console.log(`Changing tab from ${activeTab} to ${value}`);
    
    // First, signal to stop any playing audio
    setShouldStopAudio(true);
    
    // Short delay to allow audio to stop before changing tabs
    setTimeout(() => {
      setActiveTab(value);
      // Reset the stop audio flag after changing tabs
      setShouldStopAudio(false);
    }, 200); // Slightly longer delay for better audio transition
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-purple-100 dark:border-gray-700 w-full max-w-4xl mx-auto">
      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-center text-gray-800 dark:text-gray-200">
        🎭 Personalized Visual & Audio Assets
      </h3>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger 
            value="normal"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
          >
            Normal
          </TabsTrigger>
          <TabsTrigger 
            value="personalized"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
          >
            Personalized
          </TabsTrigger>
        </TabsList>

        <TabsContent value="normal" className="mt-0">
          <TabContent 
            type="normal" 
            shouldStopAudio={activeTab !== 'normal' || shouldStopAudio}
            isActive={activeTab === 'normal'}
          />
        </TabsContent>

        <TabsContent value="personalized" className="mt-0">
          <TabContent 
            type="personalized" 
            shouldStopAudio={activeTab !== 'personalized' || shouldStopAudio}
            isActive={activeTab === 'personalized'}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
