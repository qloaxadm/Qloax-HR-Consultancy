import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { SERVICES } from "@/content/services";
import { ARTICLES } from "@/content/insights";
import { JOBS } from "@/content/jobs";

const STATIC_ROUTES = [
  "",
  "/about",
  "/services",
  "/industries",
  "/employers",
  "/careers",
  "/candidate-registration",
  "/insights",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
];

/* Draft articles and sample job records are deliberately excluded until they are real. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...STATIC_ROUTES,
    ...SERVICES.map((service) => `/services/${service.slug}`),
    ...ARTICLES.filter((article) => article.status === "published").map((article) => `/insights/${article.slug}`),
    ...JOBS.filter((job) => !job.isSample).map((job) => `/careers/${job.slug}`),
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route.startsWith("/careers") ? "daily" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
