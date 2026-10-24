import type { Industry } from "@/lib/types";

/**
 * Proposed coverage areas, subject to client confirmation. No claim of
 * established track record or client history is made for any category —
 * copy describes focus, not proof of past placements.
 */
export const INDUSTRIES: Industry[] = [
  {
    slug: "technology-digital",
    name: "Technology & Digital",
    description:
      "Product, engineering, data, and digital teams building modern software and platforms.",
  },
  {
    slug: "engineering-manufacturing",
    name: "Engineering & Manufacturing",
    description:
      "Operational, technical, and plant leadership roles across industrial and manufacturing businesses.",
  },
  {
    slug: "bfsi-financial-services",
    name: "BFSI & Financial Services",
    description:
      "Banking, financial services, and insurance roles spanning risk, operations, and client-facing functions.",
  },
  {
    slug: "healthcare-life-sciences",
    name: "Healthcare & Life Sciences",
    description:
      "Clinical operations, research, and commercial roles across healthcare and life sciences organisations.",
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    description:
      "Consulting, legal, advisory, and other knowledge-based professional service firms.",
  },
  {
    slug: "sales-marketing-operations",
    name: "Sales, Marketing & Operations",
    description:
      "Revenue, growth, and operational roles that keep ambitious businesses moving forward.",
  },
];

export function getIndustryBySlug(slug: string) {
  return INDUSTRIES.find((industry) => industry.slug === slug);
}
