import type { Job } from "@/lib/types";

/**
 * SAMPLE / DEVELOPMENT DATA ONLY.
 *
 * These are illustrative roles used to build and test search, filtering,
 * and application flows. They are not live vacancies. Company names are
 * withheld (confidential-search convention) rather than invented, since
 * no real client has been attached to this dataset. Replace this module
 * with a real data source (ATS/API) before launch — see README for the
 * expected shape.
 */
export const JOBS: Job[] = [
  {
    slug: "senior-product-manager-fintech",
    title: "Senior Product Manager",
    companyLabel: "Confidential — Growth-Stage Fintech",
    sector: "Technology & Digital",
    location: "London, UK",
    type: "Full-time",
    arrangement: "Hybrid",
    summary:
      "Own the roadmap for a core payments product, working closely with engineering and design leadership.",
    responsibilities: [
      "Define and prioritise the product roadmap for a core payments surface",
      "Partner with engineering, design, and compliance stakeholders",
      "Translate customer and market insight into clear product requirements",
      "Report on product performance against business objectives",
    ],
    requirements: [
      "5+ years in product management, ideally in fintech or payments",
      "Track record shipping complex B2B or B2C product features",
      "Strong stakeholder management and communication skills",
    ],
    featured: true,
    isSample: true,
  },
  {
    slug: "plant-operations-manager",
    title: "Plant Operations Manager",
    companyLabel: "Confidential — Industrial Manufacturing Group",
    sector: "Engineering & Manufacturing",
    location: "Stuttgart, Germany",
    type: "Full-time",
    arrangement: "On-site",
    summary:
      "Lead day-to-day operations for a mid-size manufacturing facility, focused on safety, output, and continuous improvement.",
    responsibilities: [
      "Manage plant operations across shifts, output, and quality targets",
      "Drive continuous improvement and lean manufacturing initiatives",
      "Own safety compliance and site operational standards",
      "Lead and develop a multi-disciplinary site team",
    ],
    requirements: [
      "7+ years in manufacturing operations, 3+ in a leadership role",
      "Experience with lean or continuous improvement methodologies",
      "Strong people leadership across cross-functional teams",
    ],
    featured: true,
    isSample: true,
  },
  {
    slug: "risk-and-compliance-lead",
    title: "Risk & Compliance Lead",
    companyLabel: "Confidential — Regional Financial Services Group",
    sector: "BFSI & Financial Services",
    location: "Singapore",
    type: "Full-time",
    arrangement: "Hybrid",
    summary:
      "Shape risk and regulatory compliance strategy across a growing regional financial services business.",
    responsibilities: [
      "Lead risk and compliance strategy across multiple markets",
      "Act as primary liaison with regulators and auditors",
      "Build and mentor a growing risk and compliance team",
      "Advise senior leadership on regulatory change",
    ],
    requirements: [
      "8+ years in risk, compliance, or regulatory roles in financial services",
      "Experience operating across multiple regulatory jurisdictions",
      "Strong written and verbal communication skills",
    ],
    featured: true,
    isSample: true,
  },
  {
    slug: "clinical-operations-specialist",
    title: "Clinical Operations Specialist",
    companyLabel: "Confidential — Clinical Research Organisation",
    sector: "Healthcare & Life Sciences",
    location: "Boston, MA",
    type: "Contract",
    arrangement: "On-site",
    summary:
      "Support trial execution and site coordination for a multi-phase clinical research programme.",
    responsibilities: [
      "Coordinate clinical trial activity across multiple study sites",
      "Maintain documentation in line with GCP standards",
      "Liaise with investigators, sponsors, and internal study teams",
    ],
    requirements: [
      "3+ years in clinical operations or trial coordination",
      "Working knowledge of GCP and regulatory documentation",
    ],
    featured: false,
    isSample: true,
  },
  {
    slug: "management-consultant",
    title: "Management Consultant",
    companyLabel: "Confidential — Strategy Advisory Firm",
    sector: "Professional Services",
    location: "New York, NY",
    type: "Full-time",
    arrangement: "Hybrid",
    summary:
      "Advise clients across sectors on operational and strategic transformation initiatives.",
    responsibilities: [
      "Lead workstreams on client engagements across sectors",
      "Develop analysis and recommendations for senior stakeholders",
      "Support business development and proposal development",
    ],
    requirements: [
      "3-6 years in management consulting or related advisory roles",
      "Strong analytical and client-facing communication skills",
    ],
    featured: false,
    isSample: true,
  },
  {
    slug: "growth-marketing-lead",
    title: "Growth Marketing Lead",
    companyLabel: "Confidential — Direct-to-Consumer Scale-up",
    sector: "Sales, Marketing & Operations",
    location: "Remote (EU time zones)",
    type: "Full-time",
    arrangement: "Remote",
    summary:
      "Own acquisition strategy and performance marketing for a fast-growing consumer brand.",
    responsibilities: [
      "Define and execute multi-channel growth marketing strategy",
      "Own performance marketing budget and reporting",
      "Collaborate with creative and product teams on campaigns",
    ],
    requirements: [
      "4+ years in growth or performance marketing",
      "Experience owning budget and channel strategy end-to-end",
    ],
    featured: true,
    isSample: true,
  },
  {
    slug: "firmware-engineer-contract",
    title: "Firmware Engineer (6-Month Contract)",
    companyLabel: "Confidential — Industrial IoT Company",
    sector: "Technology & Digital",
    location: "Austin, TX",
    type: "Contract",
    arrangement: "On-site",
    summary:
      "Develop and test embedded firmware for a new generation of connected industrial sensors.",
    responsibilities: [
      "Design and implement firmware for embedded sensor hardware",
      "Collaborate with hardware engineers on integration testing",
      "Support debugging and performance optimisation",
    ],
    requirements: [
      "Strong C/C++ experience in embedded or firmware contexts",
      "Experience with RTOS and hardware debugging tools",
    ],
    featured: false,
    isSample: true,
  },
  {
    slug: "hr-business-partner",
    title: "HR Business Partner",
    companyLabel: "Confidential — Multinational Services Group",
    sector: "Professional Services",
    location: "Toronto, Canada",
    type: "Temporary",
    arrangement: "Hybrid",
    summary:
      "Provide HR partnership to a regional leadership team through a period of organisational change.",
    responsibilities: [
      "Partner with leadership on organisational design and change",
      "Support performance management and employee relations",
      "Guide managers through workforce planning decisions",
    ],
    requirements: [
      "5+ years as an HR Business Partner or similar role",
      "Experience supporting organisations through change",
    ],
    featured: false,
    isSample: true,
  },
];

export function getJobBySlug(slug: string) {
  return JOBS.find((job) => job.slug === slug);
}

export function getFeaturedJobs() {
  return JOBS.filter((job) => job.featured);
}

export const JOB_LOCATIONS = Array.from(
  new Set(JOBS.map((job) => job.location)),
).sort();

export const JOB_TYPES = Array.from(new Set(JOBS.map((job) => job.type)));

export const JOB_ARRANGEMENTS = Array.from(
  new Set(JOBS.map((job) => job.arrangement)),
);
