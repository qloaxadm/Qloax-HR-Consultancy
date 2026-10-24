export type NavLink = {
  label: string;
  href: string;
};

export type ServiceSlug =
  | "permanent-recruitment"
  | "executive-search"
  | "contract-staffing"
  | "talent-advisory";

export type Service = {
  number: string;
  slug: ServiceSlug;
  title: string;
  summary: string;
  description: string;
  deliverables: string[];
  icon: "target" | "search" | "layers" | "compass";
};

export type Industry = {
  slug: string;
  name: string;
  description: string;
};

export type JobType = "Full-time" | "Contract" | "Temporary";
export type WorkArrangement = "Remote" | "Hybrid" | "On-site";

export type Job = {
  slug: string;
  title: string;
  companyLabel: string;
  sector: string;
  location: string;
  type: JobType;
  arrangement: WorkArrangement;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  featured: boolean;
  isSample: true;
};

export type MethodologyStep = {
  index: string;
  title: string;
  description: string;
};

export type Article = {
  slug: string;
  title: string;
  dek: string;
  topic: string;
  status: "draft";
  body: string[];
};

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
};
