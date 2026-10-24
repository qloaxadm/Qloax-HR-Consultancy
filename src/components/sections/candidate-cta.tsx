import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function CandidateCta() {
  return (
    <Section surface="bg-secondary" border>
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <Reveal className="max-w-xl">
            <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.22em] text-accent">
              For Candidates
            </p>
            <h2 className="text-display-3 font-medium text-balance text-ink">
              Your skills deserve the right opportunity.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Share your experience and career goals so we can consider you
              for relevant opportunities.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/candidate-registration">Introduce Yourself</Button>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
