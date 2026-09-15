export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Mobile App' | 'Full-Stack & SaaS' | 'Architecture' | 'AI & Backend';
  role: string;
  timeline: string;
  impactMetrics: string[];
  description: string;
  architectureHighlights: string[];
  technologies: string[];
  badge?: string;
  githubUrl?: string;
  liveUrl?: string;
  appStoreRating?: string;
  featured?: boolean;
}

export interface ClientEngagement {
  id: string;
  client: string;
  domain: string;
  role: string;
  period: string;
  bullets: string[];
  technologies: string[];
  metrics: string[];
}

export interface WorkExperience {
  company: string;
  location: string;
  role: string;
  period: string;
  summary: string;
  engagements: ClientEngagement[];
}

export interface SkillGroup {
  category: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Proficient';
    highlight?: boolean;
    tag?: string;
  }[];
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  period: string;
  grade?: string;
  achievement?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  roleHeadline: string;
  summary: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  cvPdfPath: string;
  cvFilename: string;
  stats: {
    label: string;
    value: string;
    sublabel: string;
  }[];
}
