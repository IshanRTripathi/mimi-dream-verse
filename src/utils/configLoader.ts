
import yaml from 'js-yaml';

// Import YAML files as text
import featuresYaml from '../data/features.yaml?raw';
import howItWorksYaml from '../data/how-it-works.yaml?raw';
import testimonialsYaml from '../data/testimonials.yaml?raw';
import waitlistYaml from '../data/waitlist.yaml?raw';

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

export const loadFeatures = (): FeatureConfig[] => {
  const data = yaml.load(featuresYaml) as { features: FeatureConfig[] };
  return data.features;
};

export const loadHowItWorksSteps = (): StepConfig[] => {
  const data = yaml.load(howItWorksYaml) as { steps: StepConfig[] };
  return data.steps;
};

export const loadTestimonials = (): TestimonialConfig[] => {
  const data = yaml.load(testimonialsYaml) as { testimonials: TestimonialConfig[] };
  return data.testimonials;
};

export const loadWaitlistConfig = (): WaitlistConfig => {
  const data = yaml.load(waitlistYaml) as { waitlist: WaitlistConfig };
  return data.waitlist;
};
