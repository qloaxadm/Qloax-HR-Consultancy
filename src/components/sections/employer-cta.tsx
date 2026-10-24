import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AnimatedHeadline } from "@/components/ui/animated-headline";
import { Reveal } from "@/components/ui/reveal";

export function EmployerCta() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface py-24 sm:py-32">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <p className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.22em] text-accent">
              For Employers
            </p>
          </Reveal>
          <AnimatedHeadline
            lines={["Your next great hire", "changes everything."]}
            className="text-display-2 font-medium text-ink"
            trigger="inView"
            as="h2"
          />
          <Reveal
            delay={0.15}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
          >
            Tell us what your team needs. We&apos;ll help you define the
            role, identify relevant talent, and build a focused recruitment
            plan.
          </Reveal>
          <Reveal delay={0.25} className="mt-10">
            <Button href="/employers">Discuss a Hiring Need</Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
