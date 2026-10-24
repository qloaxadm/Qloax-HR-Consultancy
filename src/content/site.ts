import type { NavLink } from "@/lib/types";

/**
 * Working brand. Placeholder until the client confirms final naming,
 * logo, palette, and legal details. Copy throughout the site is written
 * to be swapped out without restructuring layout or components.
 */
export const SITE = {
  name: "Vantage People",
  shortName: "Vantage",
  legalName: "Vantage People Ltd.",
  tagline: "People who move business forward.",
  heroStatement: "Great people. Extraordinary business.",
  description:
    "Vantage People is a strategic talent partner connecting ambitious businesses with exceptional people through thoughtful recruitment, industry expertise, and lasting partnerships.",
  isPlaceholderBrand: true,
} as const;

/**
 * Production domain is not yet known. Falls back to localhost so metadata
 * and sitemap generation work in development; set NEXT_PUBLIC_SITE_URL
 * before deploying.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const PRIMARY_NAV: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "For Employers", href: "/employers" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
];

export const FOOTER_NAV: { heading: string; links: NavLink[] }[] = [
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
    heading: "Services",
    links: [
      { label: "Permanent Recruitment", href: "/services/permanent-recruitment" },
      { label: "Executive Search", href: "/services/executive-search" },
      { label: "Contract & Temporary Staffing", href: "/services/contract-staffing" },
      { label: "Talent Advisory", href: "/services/talent-advisory" },
    ],
  },
  {
    heading: "For People",
    links: [
      { label: "Employers", href: "/employers" },
      { label: "Browse Careers", href: "/careers" },
      { label: "Candidate Registration", href: "/candidate-registration" },
    ],
  },
];

export const LEGAL_NAV: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
];
