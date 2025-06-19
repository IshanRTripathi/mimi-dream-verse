import yaml from 'js-yaml';

// Import YAML files as text
import featuresYaml from '../data/features.yaml?raw';
import howItWorksYaml from '../data/how-it-works.yaml?raw';
import testimonialsYaml from '../data/testimonials.yaml?raw';
import waitlistYaml from '../data/waitlist.yaml?raw';
import audioYaml from '../data/audio.yaml?raw';

export interface FeatureConfig {
  icon: string;
  title: string;
  description: string;
  demo: string;
  gradient: string;
  bgGradient: string;
  image: string;
  imageAlt: string;
}

export interface InteractiveFeatureConfig {
  title: string;
  description: string;
  images: {
    primary: string;
    secondary: string;
  };
  theme: "accessibility" | "emotional" | "imagination" | "building";
}

export interface StepConfig {
  step: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  imagePlaceholder: string;
}

export interface TestimonialConfig {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  highlight: string;
}

export interface WaitlistConfig {
  title: string;
  subtitle: string;
  earlyBirdPerks: {
    title: string;
    benefits: string[];
  };
  successMessage: {
    title: string;
    subtitle: string;
    details: string;
  };
}

export interface AudioConfig {
  background_music: {
    name: string;
    file: string;
    volume: number;
    loop: boolean;
  }[];
  ui_sounds: {
    click: string;
    pop: string;
    success: string;
    hover: string;
  };
  story_audio: {
    personalized: string;
    ai_narrator: string;
  };
  // ambient_sounds removed as it's not used in the application
  volume_levels: {
    background_music: number;
    narration: number;
    ui_sounds: number;
  };
}

export const loadFeatures = (): FeatureConfig[] => {
  const data = yaml.load(featuresYaml) as { features: FeatureConfig[] };
  return data.features;
};

export const loadInteractiveFeatures = (): InteractiveFeatureConfig[] => {
  const data = yaml.load(featuresYaml) as { interactive_features: InteractiveFeatureConfig[] };
  return data.interactive_features;
};

export const loadHowItWorksSteps = (): StepConfig[] => {
  const data = yaml.load(howItWorksYaml) as { steps: StepConfig[] };
  return data.steps;
};

export const loadTestimonials = (): TestimonialConfig[] => {
  // const data = yaml.load(testimonialsYaml) as { testimonials: TestimonialConfig[] };
  // return data.testimonials;
  return []
};

export const loadWaitlistConfig = (): WaitlistConfig => {
  const data = yaml.load(waitlistYaml) as { waitlist: WaitlistConfig };
  return data.waitlist;
};

export const loadAudioConfig = (): AudioConfig => {
  const data = yaml.load(audioYaml) as { audio: AudioConfig };
  return data.audio;
};
