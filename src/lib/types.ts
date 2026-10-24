import type { StaticImageData } from "next/image";

export type NavLink = {
  label: string;
  href: string;
};

export type ServiceSlug =
  | "permanent-recruitment"
  | "executive-search"
  | "contract-staffing"
  | "talent-advisory";

export type ServiceGlyph = "target" | "radar" | "layers" | "compass";

export type Service = {
  number: string;
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  deliverables: string[];
  whenItFits: string[];
  glyph: ServiceGlyph;
};

export type IndustryMotif =
  | "circuit"
  | "truss"
  | "ascent"
  | "pulse"
  | "columns"
  | "flow";

export type Industry = {
  slug: string;
  name: string;
  description: string;
  roles: string[];
  motif: IndustryMotif;
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
  /** Development records must never be presented or indexed as live vacancies. */
  isSample: boolean;
};

export type JobFilters = {
  q: string;
  location: string;
  type: string;
  arrangement: string;
};

export type MethodologyStep = {
  index: string;
  title: string;
  description: string;
  outcome: string;
};

export type Article = {
  slug: string;
  title: string;
  dek: string;
  topic: string;
  status: "draft" | "published";
  sections: { heading?: string; paragraphs: string[] }[];
};

export type MediaAsset = {
  src: StaticImageData;
  alt: string;
  credit: { photographer: string; url: string; license: "Unsplash License" };
};

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
  values?: Record<string, string>;
};
