import type { Service } from "@/lib/types";

export const SERVICES: Service[] = [
  {
    number: "01",
    slug: "permanent-recruitment",
    title: "Permanent Recruitment",
    summary: "Find the right people for the roles that shape your business.",
    description:
      "We manage the full permanent hiring lifecycle — from defining the role and building a shortlist to coordinating interviews and supporting a confident offer. Our focus is long-term fit, not just a fast close.",
    deliverables: [
      "Role scoping and candidate persona definition",
      "Targeted sourcing and proactive market mapping",
      "Structured screening and shortlist presentation",
      "Interview coordination and offer support",
    ],
    icon: "target",
  },
  {
    number: "02",
    slug: "executive-search",
    title: "Executive Search",
    summary:
      "Identify experienced leaders who bring clarity, direction, and impact.",
    description:
      "For leadership and senior specialist roles, we run a discreet, research-led search — mapping the market, engaging passive candidates, and assessing for both capability and cultural fit at the top of the organisation.",
    deliverables: [
      "Confidential market mapping and research",
      "Direct, discreet candidate engagement",
      "Leadership and capability assessment",
      "Stakeholder alignment through to appointment",
    ],
    icon: "search",
  },
  {
    number: "03",
    slug: "contract-staffing",
    title: "Contract & Temporary Staffing",
    summary: "Build flexible teams that respond to changing business needs.",
    description:
      "When timelines are tight or demand fluctuates, we help you scale teams quickly with vetted contract and temporary talent — without compromising on quality or fit.",
    deliverables: [
      "Rapid access to vetted contract talent",
      "Flexible engagement models by project or season",
      "Compliance and onboarding support",
      "Ongoing contractor relationship management",
    ],
    icon: "layers",
  },
  {
    number: "04",
    slug: "talent-advisory",
    title: "Talent Advisory",
    summary:
      "Improve hiring strategy, workforce planning, and recruitment processes.",
    description:
      "Beyond individual hires, we work with leadership teams to strengthen how they attract, assess, and retain talent — from workforce planning to interview design and employer brand positioning.",
    deliverables: [
      "Hiring process and interview design review",
      "Workforce and succession planning input",
      "Employer brand and candidate experience audit",
      "Recruitment technology and process guidance",
    ],
    icon: "compass",
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}
