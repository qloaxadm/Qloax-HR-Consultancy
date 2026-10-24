import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { ArrowLink } from "@/components/ui/arrow-link";
import { StaggerGroup, StaggerItem } from "@/components/ui/stagger";
import { ARTICLES } from "@/content/insights";

export function InsightsSection() {
  return (
    <section className="border-t border-line bg-surface/40 py-24 md:py-32 lg:py-40">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionLabel index="06" label="Insights" />
            <h2 className="mt-6 max-w-2xl text-display font-medium text-ink">
              Perspectives on people and work.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ArrowLink href="/insights">All insights</ArrowLink>
          </Reveal>
        </div>

        <StaggerGroup as="ul" className="mt-14 grid gap-px bg-line md:mt-20 lg:grid-cols-3">
          {ARTICLES.map((article, index) => (
            <StaggerItem as="li" key={article.slug} className="bg-bg">
              <Link
                href={`/insights/${article.slug}`}
                className="group flex h-full flex-col p-7 transition-colors duration-500 hover:bg-surface sm:p-9 lg:min-h-[23rem]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted">No. {String(index + 1).padStart(2, "0")}</span>
                  <span className="eyebrow rounded-[2px] border border-line px-2 py-1 text-[10px]">Draft</span>
                </div>
                <p className="eyebrow mt-12 text-accent">{article.topic}</p>
                <h3 className="mt-4 text-2xl font-medium leading-tight tracking-[-0.02em] text-ink">
                  {article.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{article.dek}</p>
                <span className="mt-auto flex items-center gap-2 pt-10 text-sm text-ink">
                  <span className="link-underline">Read the draft</span>
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
