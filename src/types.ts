export type Project = {
  id: string;
  name: string;
  description: string;
  year: string;
  stack: string[];
  repoUrl: string;
  previewUrl: string;
  featured?: boolean;
  accent?: string;
};

export type ExperienceItem = {
  title: string;
  organization: string;
  period: string;
  summary: string;
};

export type EducationItem = {
  program: string;
  institution: string;
  period: string;
};

export type ContactItem = {
  label: string;
  value: string;
  url: string;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  imageUrl: string;
  imageAlt: string;
  about: string[];
  skills: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  contacts: ContactItem[];
};
