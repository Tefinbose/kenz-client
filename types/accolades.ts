export interface AccoladeMetric {
  value: string;
  numericValue?: number;
  suffix?: string;
  label: string;
  subtext: string;
  badge: string;
}

export interface AccoladeItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  category: "Award" | "Certification" | "Milestone" | "Standard";
  summary: string;
  badge: string;
  details: string[];
  metrics?: { label: string; val: string }[];
  featured?: boolean;
}

export interface Certification {
  id: string;
  title: string;
  code: string;
  issuer: string;
  validity: string;
  description: string;
  badge: string;
  standards: string[];
}

export interface ClientEndorsement {
  id: string;
  quote: string;
  clientName: string;
  role: string;
  company: string;
  location: string;
  projectType: string;
  year: string;
  rating: number;
}

export interface PhilosophyPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

export interface AccoladesPageData {
  meta: {
    title: string;
    description: string;
    badge: string;
    sectionNumber: string;
  };
  hero: {
    badge: string;
    headlinePart1: string;
    headlineGradient: string;
    leadStatement: string;
    subStatement: string;
  };
  metrics: AccoladeMetric[];
  philosophy: {
    sectionTag: string;
    heading: string;
    subheading: string;
    statement: string;
    pillars: PhilosophyPillar[];
  };
  recognitions: AccoladeItem[];
  certifications: Certification[];
  endorsements: ClientEndorsement[];
  cta: {
    badge: string;
    heading: string;
    subheading: string;
    description: string;
    primaryActionLabel: string;
    primaryActionHref: string;
    secondaryActionLabel: string;
    secondaryActionHref: string;
  };
}
