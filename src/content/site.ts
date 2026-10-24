import type { NavLink } from "@/lib/types";

/**
 * Working brand. Placeholder until the client confirms final naming,
 * logo, palette, and legal details. Copy is written to be swapped out
 * without restructuring layout or components.
 */
export const SITE = {
  name: "Vantage People",
  legalName: "Vantage People Ltd",
  tagline: "People who move business forward.",
  description:
    "Vantage People connects ambitious businesses with exceptional talent through thoughtful recruitment and lasting professional partnerships.",
  isPlaceholderBrand: true,
} as const;

/**
 * Production domain is not yet known. NEXT_PUBLIC_SITE_URL must be set
 * before deploying so canonical URLs, sitemap entries, and Open Graph
 * links resolve to the real domain.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const HAS_PRODUCTION_URL = Boolean(process.env.NEXT_PUBLIC_SITE_URL);

export const HERO = {
  eyebrow: "People. Potential. Progress.",
  lines: ["Great people.", "Move business", "forward."],
  supporting:
    "We connect ambitious businesses with exceptional talent through thoughtful recruitment and lasting professional partnerships.",
  primaryCta: { label: "Hire Talent", href: "/employers#enquiry" },
  secondaryCta: { label: "Explore Opportunities", href: "/careers" },
} as const;

export const PRIMARY_NAV: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "For Employers", href: "/employers" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
];

export const FOOTER_NAV: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Services",
    links: [
      { label: "Permanent Recruitment", href: "/services/permanent-recruitment" },
      { label: "Executive Search", href: "/services/executive-search" },
      { label: "Contract & Temporary", href: "/services/contract-staffing" },
      { label: "Talent Advisory", href: "/services/talent-advisory" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Industries", href: "/industries" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Get started",
    links: [
      { label: "Hire talent", href: "/employers#enquiry" },
      { label: "Browse roles", href: "/careers" },
      { label: "Register as a candidate", href: "/candidate-registration" },
    ],
  },
];

export const LEGAL_NAV: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
];
