export type Language = "fr" | "en" | "es" | "ar" | "de" | "it" | "zh" | "pt" | "ru" | "sw";

export interface NavItem {
  id: string;
  label: {
    fr: string;
    en: string;
  };
}

export interface StatItem {
  id: string;
  count: number;
  prefix?: string;
  suffix: string;
  label: {
    fr: string;
    en: string;
  };
}

export interface CauseItem {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  shortDescription: {
    fr: string;
    en: string;
  };
  longDescription: {
    fr: string;
    en: string;
  };
  impactStats: {
    fr: string[];
    en: string[];
  };
  image: string;
  videoUrl?: string;
  category: "medical | handicap | elderly | family | orphan | emergency";
}

export interface Campaign {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  story: {
    fr: string;
    en: string;
  };
  goal: number;
  raised: number;
  backersCount: number;
  daysRemaining: number;
  category: string;
  image: string;
  videoUrl?: string;
  beneficiary: {
    fr: string;
    en: string;
  };
}

export interface Story {
  id: string;
  name: string;
  age?: number;
  location: {
    fr: string;
    en: string;
  };
  before: {
    fr: string;
    en: string;
  };
  after: {
    fr: string;
    en: string;
  };
  quote: {
    fr: string;
    en: string;
  };
  imageBefore: string;
  imageAfter: string;
  impactMetric: {
    fr: string;
    en: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: {
    fr: string;
    en: string;
  };
  message: {
    fr: string;
    en: string;
  };
  avatar: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  type: {
    fr: string;
    en: string;
  };
  website?: string;
}

export interface FAQItem {
  id: string;
  question: {
    fr: string;
    en: string;
  };
  answer: {
    fr: string;
    en: string;
  };
}

export interface GalleryItem {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  category: {
    fr: string;
    en: string;
  };
  image: string;
  videoUrl?: string;
}

export interface NewsItem {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  date: string;
  excerpt: {
    fr: string;
    en: string;
  };
  content: {
    fr: string;
    en: string;
  };
  image: string;
}

export interface RealtimeNotification {
  id: string;
  type: "donation" | "campaign" | "goal";
  message: {
    fr: string;
    en: string;
    [key: string]: string;
  };
  time: string;
}

export interface DonorWallItem {
  id: string;
  name: string;
  amount: number;
  cause: {
    fr: string;
    en: string;
  };
  time: {
    fr: string;
    en: string;
  };
  isAnonymous?: boolean;
}
