import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { MaskImage } from "@/components/ui/mask-image";
import { StaggerGroup, StaggerItem } from "@/components/ui/stagger";
import { ProcessSection } from "@/components/home/process-section";
import { EmployerEnquiryForm } from "@/components/forms/employer-enquiry-form";
import { MEDIA } from "@/content/media";
import { SERVICES } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "For Employers",
  description:
    "Hire with clarity and confidence. Tell us what your team needs and we'll help you define the role, reach the right people, and make a confident decision.",
  path: "/employers",
});

const COMMITMENTS = [
  {
    title: "A clear brief",
    text: "We start by understanding the role, the team, and what success looks like — and write it down so everyone is aligned.",
  },
  {
    title: "A focused shortlist",
    text: "You meet candidates who match the brief, with a clear rationale for each — not a stack of CVs to sort through.",
  },
  {
    title: "Honest communication",
    text: "Regular, straightforward updates on progress, market feedback, and anything that could affect the search.",
  },
  {
    title: "Support beyond the offer",
    text: "We stay involved through offer and onboarding, so the hire lands well for both sides.",
  },
];

const NEXT_STEPS = [
  "We review your enquiry and prepare questions",
  "A consultant contacts you to talk through the brief",
  "We agree on the approach, timeline, and next steps",
];

export default function EmployersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "For Employers" }]}
        eyebrow="For employers"
        title={["Hire with clarity", "and confidence."]}
        description="From a single critical role to a growing team, we help you define what you need, reach the right people, and make confident hiring decisions."
        actions={
          <>
            <Button href="#enquiry">Start an enquiry</Button>
            <Button href="/services" variant="secondary">
              Our services
            </Button>
          </>
        }
      />

      <section className="pt-16 md:pt-24">
        <Container>
          <MaskImage
            media={MEDIA.conversation}
            sizes="(min-width: 1440px) 1312px, 100vw"
            eager
            reveal="center"
            parallax={5}
            className="aspect-[4/3] md:aspect-[21/9]"
            imageClassName="object-[50%_40%]"
          />
          <p className="eyebrow mt-5">It starts with a conversation.</p>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionLabel label="What to expect" />
            <h2 className="mt-6 max-w-3xl text-display font-medium text-ink">What every engagement includes.</h2>
          </Reveal>
          <StaggerGroup as="ul" className="mt-14 grid gap-px overflow-hidden rounded-[2px] border border-line bg-line md:mt-20 md:grid-cols-2">
            {COMMITMENTS.map((item, index) => (
              <StaggerItem as="li" key={item.title} className="bg-bg p-8 md:p-12">
                <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-10 text-2xl font-medium tracking-[-0.02em] text-ink">{item.title}</h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-muted">{item.text}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="border-t border-line py-24 md:py-32">
        <Container className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <Reveal className="lg:col-span-4">
            <SectionLabel label="Services" />
            <h2 className="mt-6 text-display font-medium text-ink">Ways to work with us.</h2>
          </Reveal>
          <ul className="border-t border-line lg:col-span-7 lg:col-start-6">
            {SERVICES.map((service) => (
              <li key={service.slug} className="border-b border-line">
                <Link href={`/services/${service.slug}`} className="group flex items-start justify-between gap-6 py-7">
                  <span>
                    <span className="flex items-baseline gap-5">
                      <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">{service.number}</span>
                      <span className="text-xl font-medium tracking-[-0.015em] text-ink">{service.title}</span>
                    </span>
                    <span className="mt-2 block pl-10 text-sm text-muted">{service.summary}</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="mt-1 size-5 shrink-0 text-muted transition-[color,transform] duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ProcessSection showLink={false} />

      <section id="enquiry" className="border-t border-line bg-surface/40 py-24 md:py-32">
        <Container className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <SectionLabel label="Hiring enquiry" />
            <h2 className="mt-6 text-display font-medium text-ink">Tell us about the role.</h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              Share as much or as little as you know. We&apos;ll use it to prepare for a focused first conversation.
            </p>
            <ol className="mt-10 space-y-5 border-t border-line pt-8">
              {NEXT_STEPS.map((step, index) => (
                <li key={step} className="flex gap-4 text-sm text-ink/85">
                  <span className="font-mono text-xs leading-5 text-accent">{String(index + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="rounded-[2px] border border-line bg-bg p-6 sm:p-10">
              <EmployerEnquiryForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
