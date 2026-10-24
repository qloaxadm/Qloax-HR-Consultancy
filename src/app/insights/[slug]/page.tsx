import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SplitCta } from "@/components/layout/split-cta";
import { Container } from "@/components/ui/container";
import { LineReveal, delayStyle } from "@/components/ui/line-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { ARTICLES, getArticleBySlug } from "@/content/insights";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.dek,
    path: `/insights/${article.slug}`,
    noindex: article.status !== "published",
  });
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  const others = ARTICLES.filter((item) => item.slug !== article.slug);

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden border-b border-line">
          <div aria-hidden="true" className="hairline-grid absolute inset-0 -z-10 opacity-35" />
          <Container className="pb-14 pt-32 md:pb-20 md:pt-40">
            <Breadcrumbs items={[{ label: "Insights", href: "/insights" }, { label: article.topic }]} />
            <div className="rise-in mt-10 flex flex-wrap items-center gap-4" style={delayStyle(60)}>
              <p className="eyebrow text-accent">{article.topic}</p>
              {article.status === "draft" && (
                <span className="eyebrow rounded-[2px] border border-line px-2 py-1 text-[10px]">
                  Draft — pending editorial approval
                </span>
              )}
            </div>
            <LineReveal lines={[article.title]} startDelay={120} className="mt-6 max-w-4xl text-display font-medium text-ink" />
            <p className="rise-in mt-8 max-w-2xl text-lead text-muted" style={delayStyle(320)}>
              {article.dek}
            </p>
          </Container>
        </header>

        <Container className="py-16 md:py-24">
          <div className="grid lg:grid-cols-12 lg:gap-x-10">
            <div className="prose-vp lg:col-span-7 lg:col-start-3">
              {article.sections.map((section, index) => (
                <div key={section.heading ?? index}>
                  {section.heading && <h2>{section.heading}</h2>}
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </article>

      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <SectionLabel label="More perspectives" />
          <ul className="mt-10 grid gap-px overflow-hidden rounded-[2px] border border-line bg-line md:grid-cols-2">
            {others.map((other) => (
              <li key={other.slug} className="bg-bg">
                <Link href={`/insights/${other.slug}`} className="group flex h-full flex-col p-8 transition-colors duration-500 hover:bg-surface md:p-10">
                  <span className="eyebrow text-accent">{other.topic}</span>
                  <span className="mt-6 text-2xl font-medium leading-tight tracking-[-0.02em] text-ink">{other.title}</span>
                  <span className="mt-3 text-sm leading-relaxed text-muted">{other.dek}</span>
                  <span className="mt-8 flex items-center gap-2 text-sm text-ink">
                    <span className="link-underline">Read the draft</span>
                    <ArrowRight aria-hidden className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <SplitCta />
    </>
  );
}
