export interface Profile {
  name: string;
  title: string;
  blurb: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  locationUrl: string;
  locationText: string;
  resume: string;
}

export interface Project {
  id: string;
  name: string;
  description: string[];
  image: string;
}

export interface ClientGroup {
  category: string;
  items: string[];
}