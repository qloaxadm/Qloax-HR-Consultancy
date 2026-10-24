import type { Metadata } from "next";
import { HAS_PRODUCTION_URL, SITE } from "@/content/site";

export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: HAS_PRODUCTION_URL ? { canonical: path } : undefined,
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: `${title} — ${SITE.name}`,
      description,
      url: path,
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
