import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { SplitCta } from "@/components/layout/split-cta";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Button } from "@/components/ui/button";
import { Faq } from "@/components/ui/faq";
import { InViewGlyph } from "@/components/graphics/in-view-glyph";
import { SERVICES } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Permanent recruitment, executive search, contract and temporary staffing, and talent advisory for ambitious businesses.",
  path: "/services",
});

const FAQ = [
  {
    question: "Which service is right for us?",
    answer:
      "If you're unsure, start with a conversation. We'll recommend the approach that fits the role, your timeline, and your budget — sometimes that's a combination.",
  },
  {
    question: "How do you assess candidates?",
    answer:
      "Against criteria agreed with you in the brief, through structured screening conversations and, where relevant, references or skills assessments.",
  },
  {
    question: "Can a search stay confidential?",
    answer:
      "Yes. Leadership and sensitive searches can run without naming your organization until the right stage of the process.",
  },
  {
    question: "What happens after someone is hired?",
    answer:
      "We stay in touch through the offer and onboarding period to help the hire land well for both sides.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Services" }]}
        eyebrow="Services"
        title={["People solutions for", "ambitious businesses."]}
        description="Four ways to work with us. Each starts with a conversation about what your business needs — and ends with the right person in the role."
        actions={<Button href="/employers#enquiry">Discuss a hiring need</Button>}
      />

      <section className="py-12 md:py-20">
        <Container>
          {SERVICES.map((service) => (
            <Reveal key={service.slug}>
              <article className="group grid gap-8 border-b border-line py-14 md:py-20 lg:grid-cols-12 lg:gap-x-10">
                <span className="font-mono text-xs text-accent lg:col-span-1">{service.number}</span>
                <div className="lg:col-span-5">
                  <h2 className="text-title font-medium text-ink">
                    <Link href={`/services/${service.slug}`} className="transition-colors hover:text-accent">
                      {service.title}
                    </Link>
                  </h2>
                  <p className="mt-4 text-lead text-muted">{service.summary}</p>
                  <ArrowLink href={`/services/${service.slug}`} className="mt-8">
                    Explore {service.title}
                  </ArrowLink>
                </div>
                <div className="lg:col-span-4 lg:col-start-8">
                  <p className="eyebrow">What&apos;s included</p>
                  <ul className="mt-5 space-y-3">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/85">
                        <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <InViewGlyph glyph={service.glyph} className="hidden size-20 justify-self-end lg:col-span-1 lg:block" />
              </article>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="border-t border-line bg-surface/40 py-24 md:py-32">
        <Container className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <Reveal className="lg:col-span-4">
            <SectionLabel label="Questions" />
            <h2 className="mt-6 text-display font-medium text-ink">What employers ask first.</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <Faq items={FAQ} />
          </Reveal>
        </Container>
      </section>

      <SplitCta />
    </>
  );
}
