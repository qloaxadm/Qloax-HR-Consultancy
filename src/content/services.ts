import type { Service } from "@/lib/types";

export const SERVICES: Service[] = [
  {
    number: "01",
    slug: "permanent-recruitment",
    title: "Permanent Recruitment",
    shortTitle: "Permanent",
    summary: "Find the right people for the roles that shape your business.",
    description:
      "We manage the full permanent hiring lifecycle — from defining the role and mapping the market to shortlisting, interviews, and a confident offer. The focus is long-term fit, not just a fast close.",
    deliverables: [
      "Role scoping and a written brief agreed with hiring managers",
      "Targeted sourcing beyond active job seekers",
      "Structured screening against agreed criteria",
      "Interview coordination, feedback, and offer support",
    ],
    whenItFits: [
      "You are growing a team and need hires who will stay",
      "A role has been open longer than planned",
      "Internal teams lack the time or reach to source well",
    ],
    glyph: "target",
  },
  {
    number: "02",
    slug: "executive-search",
    title: "Executive Search",
    shortTitle: "Executive",
    summary:
      "Identify experienced leaders who bring clarity, direction, and impact.",
    description:
      "For leadership and senior specialist roles, we run a discreet, research-led search — mapping the market, approaching people who are not actively looking, and assessing for capability and cultural fit at the top of the organization.",
    deliverables: [
      "Confidential market mapping and research",
      "Direct, discreet approaches to passive candidates",
      "Leadership and capability assessment",
      "Stakeholder alignment through to appointment",
    ],
    whenItFits: [
      "The role shapes strategy, culture, or a whole function",
      "The search must stay confidential",
      "The strongest candidates are unlikely to apply to an advert",
    ],
    glyph: "radar",
  },
  {
    number: "03",
    slug: "contract-staffing",
    title: "Contract & Temporary Staffing",
    shortTitle: "Contract",
    summary: "Build flexible teams that respond to changing business needs.",
    description:
      "When timelines are tight or demand fluctuates, we help you scale with vetted contract and temporary professionals — matched to the work, briefed properly, and supported for the length of the engagement.",
    deliverables: [
      "Fast access to vetted contract professionals",
      "Engagements shaped by project, season, or cover need",
      "Onboarding and compliance coordination",
      "Ongoing check-ins for the length of the assignment",
    ],
    whenItFits: [
      "A project needs specialist skills for a defined period",
      "You need cover for leave, change, or peak demand",
      "You want to test a role before making it permanent",
    ],
    glyph: "layers",
  },
  {
    number: "04",
    slug: "talent-advisory",
    title: "Talent Advisory",
    shortTitle: "Advisory",
    summary:
      "Improve hiring strategy, workforce planning, and recruitment processes.",
    description:
      "Beyond individual hires, we work with leadership teams to strengthen how they attract, assess, and keep talent — from workforce planning and interview design to the candidate experience your process creates.",
    deliverables: [
      "Hiring process and interview design review",
      "Workforce and succession planning input",
      "Employer brand and candidate experience audit",
      "Practical recommendations your team can run with",
    ],
    whenItFits: [
      "Hiring is slow, inconsistent, or hard to scale",
      "You are planning significant growth or restructuring",
      "Strong candidates are dropping out of your process",
    ],
    glyph: "compass",
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}
