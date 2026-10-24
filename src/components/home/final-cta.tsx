import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { InViewLines } from "@/components/ui/in-view-lines";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div aria-hidden="true" className="hairline-grid absolute inset-0 opacity-40" />
      <Container className="relative py-28 md:py-40 lg:py-48">
        <Reveal>
          <SectionLabel label="Start a conversation" />
        </Reveal>
        <InViewLines
          lines={[
            "Let's find",
            <span key="fit" className="lg:pl-[1.1em]">
              the right fit<span className="text-accent">.</span>
            </span>,
          ]}
          className="mt-8 text-hero font-medium text-ink"
        />
        <div className="mt-14 flex flex-col gap-10 md:mt-20 lg:flex-row lg:items-end lg:justify-between lg:pl-[calc(var(--text-hero)*1.1)]">
          <Reveal>
            <p className="max-w-md text-lead text-muted">
              Whether you&apos;re building a team or planning your next move, let&apos;s start a
              conversation.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap gap-3">
            <Button href="/employers#enquiry">Hire Talent</Button>
            <Button href="/careers" variant="secondary">
              Explore Careers
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
