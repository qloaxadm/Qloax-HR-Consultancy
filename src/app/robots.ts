import type { MetadataRoute } from "next";
import { HAS_PRODUCTION_URL, SITE_URL } from "@/content/site";

/* Until a production domain is configured, keep previews (with placeholder brand and sample data) out of search. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: HAS_PRODUCTION_URL ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
