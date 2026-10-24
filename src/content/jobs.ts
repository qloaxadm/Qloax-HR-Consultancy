import type { Job } from "@/lib/types";

/**
 * DEVELOPMENT RECORDS — NOT LIVE VACANCIES.
 *
 * Illustrative roles used to build and test search, filtering, job pages,
 * and applications. Company names are withheld (a common convention for
 * confidential searches) rather than invented, because no real client is
 * attached to this data. Replace this module with an ATS or API source
 * before launch; see README "Backend integration" for the expected shape.
 * Records with `isSample: true` are labeled in the UI, excluded from the
 * sitemap, marked noindex, and never emit JobPosting structured data.
 */
export const JOBS: Job[] = [
  {
    slug: "senior-product-manager-fintech",
    title: "Senior Product Manager",
    companyLabel: "Confidential — growth-stage fintech",
    sector: "Technology & Digital",
    location: "London, UK",
    type: "Full-time",
    arrangement: "Hybrid",
    summary:
      "Own the roadmap for a core payments product, working closely with engineering and design leadership.",
    responsibilities: [
      "Define and prioritize the roadmap for a core payments product",
      "Partner with engineering, design, and compliance stakeholders",
      "Turn customer and market insight into clear requirements",
      "Report on product performance against business objectives",
    ],
    requirements: [
      "5+ years in product management, ideally in fintech or payments",
      "A track record of shipping complex B2B or B2C features",
      "Strong stakeholder management and written communication",
    ],
    featured: true,
    isSample: true,
  },
  {
    slug: "plant-operations-manager",
    title: "Plant Operations Manager",
    companyLabel: "Confidential — industrial manufacturing group",
    sector: "Engineering & Manufacturing",
    location: "Stuttgart, Germany",
    type: "Full-time",
    arrangement: "On-site",
    summary:
      "Lead day-to-day operations for a mid-size manufacturing site, focused on safety, output, and continuous improvement.",
    responsibilities: [
      "Run plant operations across shifts, output, and quality targets",
      "Drive continuous improvement and lean initiatives",
      "Own safety compliance and site operating standards",
      "Lead and develop a multidisciplinary site team",
    ],
    requirements: [
      "7+ years in manufacturing operations, 3+ in leadership",
      "Hands-on experience with lean or continuous improvement",
      "Confident people leadership across functions",
    ],
    featured: true,
    isSample: true,
  },
  {
    slug: "risk-and-compliance-lead",
    title: "Risk & Compliance Lead",
    companyLabel: "Confidential — regional financial services group",
    sector: "BFSI & Financial Services",
    location: "Singapore",
    type: "Full-time",
    arrangement: "Hybrid",
    summary:
      "Shape risk and regulatory compliance strategy across a growing regional financial services business.",
    responsibilities: [
      "Lead risk and compliance strategy across several markets",
      "Act as the primary contact for regulators and auditors",
      "Build and mentor a growing risk and compliance team",
      "Advise senior leadership on regulatory change",
    ],
    requirements: [
      "8+ years in risk, compliance, or regulatory roles in financial services",
      "Experience across multiple regulatory jurisdictions",
      "Clear, confident written and verbal communication",
    ],
    featured: true,
    isSample: true,
  },
  {
    slug: "clinical-operations-specialist",
    title: "Clinical Operations Specialist",
    companyLabel: "Confidential — clinical research organization",
    sector: "Healthcare & Life Sciences",
    location: "Boston, MA",
    type: "Contract",
    arrangement: "On-site",
    summary:
      "Support trial execution and site coordination for a multi-phase clinical research program.",
    responsibilities: [
      "Coordinate clinical trial activity across several study sites",
      "Maintain documentation in line with GCP standards",
      "Work with investigators, sponsors, and internal study teams",
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
    companyLabel: "Confidential — strategy advisory firm",
    sector: "Professional Services",
    location: "New York, NY",
    type: "Full-time",
    arrangement: "Hybrid",
    summary:
      "Advise clients across sectors on operational and strategic transformation.",
    responsibilities: [
      "Lead workstreams on client engagements across sectors",
      "Develop analysis and recommendations for senior stakeholders",
      "Contribute to business development and proposals",
    ],
    requirements: [
      "3–6 years in management consulting or similar advisory work",
      "Strong analytical and client-facing communication skills",
    ],
    featured: false,
    isSample: true,
  },
  {
    slug: "growth-marketing-lead",
    title: "Growth Marketing Lead",
    companyLabel: "Confidential — direct-to-consumer scale-up",
    sector: "Sales, Marketing & Operations",
    location: "Remote (EU time zones)",
    type: "Full-time",
    arrangement: "Remote",
    summary:
      "Own acquisition strategy and performance marketing for a fast-growing consumer brand.",
    responsibilities: [
      "Define and run a multi-channel growth strategy",
      "Own the performance marketing budget and reporting",
      "Work with creative and product teams on campaigns",
    ],
    requirements: [
      "4+ years in growth or performance marketing",
      "Experience owning budget and channel strategy end to end",
    ],
    featured: true,
    isSample: true,
  },
  {
    slug: "firmware-engineer-contract",
    title: "Firmware Engineer — 6-month contract",
    companyLabel: "Confidential — industrial IoT company",
    sector: "Technology & Digital",
    location: "Austin, TX",
    type: "Contract",
    arrangement: "On-site",
    summary:
      "Develop and test embedded firmware for a new generation of connected industrial sensors.",
    responsibilities: [
      "Design and implement firmware for embedded sensor hardware",
      "Work with hardware engineers on integration testing",
      "Support debugging and performance optimization",
    ],
    requirements: [
      "Strong C/C++ experience in embedded or firmware work",
      "Experience with RTOS and hardware debugging tools",
    ],
    featured: false,
    isSample: true,
  },
  {
    slug: "hr-business-partner",
    title: "HR Business Partner",
    companyLabel: "Confidential — multinational services group",
    sector: "Professional Services",
    location: "Toronto, Canada",
    type: "Temporary",
    arrangement: "Hybrid",
    summary:
      "Partner with a regional leadership team through a period of organizational change.",
    responsibilities: [
      "Advise leaders on organizational design and change",
      "Support performance management and employee relations",
      "Guide managers through workforce planning decisions",
    ],
    requirements: [
      "5+ years as an HR Business Partner or similar role",
      "Experience supporting organizations through change",
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

export const JOB_LOCATIONS = Array.from(new Set(JOBS.map((job) => job.location))).sort();
export const JOB_TYPES = ["Full-time", "Contract", "Temporary"] as const;
export const JOB_ARRANGEMENTS = ["Remote", "Hybrid", "On-site"] as const;
