import type { Industry } from "@/lib/types";

/**
 * Proposed coverage areas, subject to client confirmation. Copy describes
 * focus and typical roles — never a track record, client list, or
 * placement history, none of which has been verified.
 */
export const INDUSTRIES: Industry[] = [
  {
    slug: "technology-digital",
    name: "Technology & Digital",
    description:
      "Product, engineering, data, and digital teams building modern software and platforms.",
    roles: ["Engineering leads", "Product managers", "Data specialists"],
    motif: "circuit",
  },
  {
    slug: "engineering-manufacturing",
    name: "Engineering & Manufacturing",
    description:
      "Operational, technical, and plant leadership across industrial and manufacturing businesses.",
    roles: ["Plant managers", "Process engineers", "Quality leads"],
    motif: "truss",
  },
  {
    slug: "bfsi-financial-services",
    name: "BFSI & Financial Services",
    description:
      "Banking, financial services, and insurance roles across risk, operations, and client-facing functions.",
    roles: ["Risk & compliance", "Operations", "Relationship managers"],
    motif: "ascent",
  },
  {
    slug: "healthcare-life-sciences",
    name: "Healthcare & Life Sciences",
    description:
      "Clinical operations, research, and commercial roles across healthcare and life sciences organizations.",
    roles: ["Clinical operations", "Regulatory affairs", "Commercial leads"],
    motif: "pulse",
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    description:
      "Consulting, legal, advisory, and other knowledge-based professional service firms.",
    roles: ["Consultants", "Advisory leads", "HR business partners"],
    motif: "columns",
  },
  {
    slug: "sales-marketing-operations",
    name: "Sales, Marketing & Operations",
    description:
      "Revenue, growth, and operational roles that keep ambitious businesses moving forward.",
    roles: ["Sales leaders", "Growth marketers", "Operations managers"],
    motif: "flow",
  },
];
