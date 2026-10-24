import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { SplitCta } from "@/components/layout/split-cta";
import { Container } from "@/components/ui/container";
import { StaggerGroup, StaggerItem } from "@/components/ui/stagger";
import { ARTICLES } from "@/content/insights";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insights",
  description: "Practical thinking on hiring, careers, and building better teams.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Insights" }]}
        eyebrow="Insights"
        title={["Perspectives on", "people and work."]}
        description="Practical thinking on hiring, careers, and building better teams."
        aside={
          <div className="rounded-[2px] border border-line bg-surface p-6">
            <p className="eyebrow text-ink/80">Editorial drafts</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              These articles are drafts pending approval. They have not been published and carry no author or date yet.
            </p>
          </div>
        }
      />

      <section className="py-12 md:py-20">
        <Container>
          <StaggerGroup as="ol" className="border-t border-line">
            {ARTICLES.map((article, index) => (
              <StaggerItem as="li" key={article.slug} className="border-b border-line">
                <Link
                  href={`/insights/${article.slug}`}
                  className="group grid gap-5 py-10 transition-colors md:grid-cols-12 md:items-baseline md:gap-10 md:py-14"
                >
                  <span className="font-mono text-xs text-muted md:col-span-1">No. {String(index + 1).padStart(2, "0")}</span>
                  <span className="eyebrow text-accent md:col-span-2">{article.topic}</span>
                  <span className="md:col-span-7">
                    <span className="block text-title font-medium text-ink transition-transform duration-500 ease-out-expo md:group-hover:translate-x-2">
                      {article.title}
                    </span>
                    <span className="mt-3 block max-w-2xl text-base leading-relaxed text-muted">{article.dek}</span>
                  </span>
                  <span className="flex items-center gap-4 md:col-span-2 md:justify-self-end">
                    <span className="eyebrow rounded-[2px] border border-line px-2 py-1 text-[10px]">Draft</span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 text-muted transition-[color,transform] duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <SplitCta />
    </>
  );
}
