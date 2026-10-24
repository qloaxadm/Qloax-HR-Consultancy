import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/ui/stagger";
import { ARTICLES } from "@/content/insights";

export function InsightsPreview() {
  return (
    <Section border>
      <Container>
        <SectionHeading
          eyebrow="Insights"
          title="Perspectives on people and work."
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 lg:mt-20 lg:grid-cols-3">
          {ARTICLES.map((article) => (
            <StaggerItem key={article.slug}>
              <Link
                href={`/insights/${article.slug}`}
                className="group flex h-full flex-col border-t border-line pt-6"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wide text-accent">
                    {article.topic}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-muted">
                    Draft
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-medium text-ink transition-colors duration-300 group-hover:text-accent">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {article.dek}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-ink">
                  Read more
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
