import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { SplitCta } from "@/components/layout/split-cta";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ProcessSteps } from "@/components/ui/process-steps";
import { StaggerGroup, StaggerItem } from "@/components/ui/stagger";
import { ServiceGlyph } from "@/components/graphics/service-glyph";
import { SERVICES, getServiceBySlug } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    description: `${service.summary} ${service.description}`.slice(0, 160),
    path: `/services/${service.slug}`,
  });
}

function splitTitle(title: string) {
  const words = title.split(" ");
  const middle = Math.ceil(words.length / 2);
  return [words.slice(0, middle).join(" "), words.slice(middle).join(" ")].filter(Boolean);
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const others = SERVICES.filter((item) => item.slug !== service.slug);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Services", href: "/services" }, { label: service.title }]}
        eyebrow={`Service ${service.number}`}
        title={splitTitle(service.title)}
        description={service.summary}
        actions={
          <>
            <Button href="/employers#enquiry">Discuss a hiring need</Button>
            <Button href="/contact" variant="secondary">
              Ask a question
            </Button>
          </>
        }
        aside={
          <div className="aspect-square w-full max-w-[17rem] rounded-[2px] border border-line bg-surface p-10 lg:ml-auto">
            <ServiceGlyph glyph={service.glyph} className="size-full" />
          </div>
        }
      />

      <section className="py-24 md:py-32">
        <Container className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-10">
          <Reveal className="lg:col-span-6">
            <SectionLabel label="Overview" />
            <p className="mt-8 text-[clamp(1.375rem,1.1rem+0.9vw,2rem)] font-medium leading-snug tracking-[-0.02em] text-ink">
              {service.description}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <SectionLabel label="What's included" />
            <ol className="mt-8 border-t border-line">
              {service.deliverables.map((item, index) => (
                <li key={item} className="flex gap-6 border-b border-line py-5 text-base text-ink/90">
                  <span className="font-mono text-xs leading-6 text-accent">{String(index + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line bg-surface/40 py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionLabel label="When it fits" />
            <h2 className="mt-6 max-w-3xl text-display font-medium text-ink">Signs this is the right approach.</h2>
          </Reveal>
          <StaggerGroup as="ul" className="mt-14 grid gap-px overflow-hidden rounded-[2px] border border-line bg-line md:mt-20 md:grid-cols-3">
            {service.whenItFits.map((item, index) => (
              <StaggerItem as="li" key={item} className="bg-bg p-8 md:p-10">
                <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-10 text-xl font-medium leading-snug tracking-[-0.015em] text-ink">{item}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionLabel label="How it works" />
            <h2 className="mt-6 max-w-3xl text-display font-medium text-ink">From brief to first day.</h2>
          </Reveal>
          <Reveal className="mt-14 md:mt-20">
            <ProcessSteps />
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line py-24 md:py-32">
        <Container>
          <SectionLabel label="Other services" />
          <ul className="mt-10 border-t border-line">
            {others.map((other) => (
              <li key={other.slug} className="border-b border-line">
                <Link
                  href={`/services/${other.slug}`}
                  className="group flex items-center justify-between gap-6 py-7 transition-colors md:py-9"
                >
                  <span className="flex items-baseline gap-6 md:gap-10">
                    <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">{other.number}</span>
                    <span className="text-title font-medium text-ink/55 transition-colors duration-500 group-hover:text-ink">
                      {other.title}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 shrink-0 text-muted transition-[color,transform] duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
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
