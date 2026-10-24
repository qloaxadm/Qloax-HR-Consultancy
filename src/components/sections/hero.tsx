import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AnimatedHeadline } from "@/components/ui/animated-headline";
import { FadeIn } from "@/components/ui/fade-in";
import { HeroVisual } from "./hero-visual";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden border-b border-line pb-16 pt-28">
      <div className="absolute inset-0">
        <HeroVisual />
        <div className="absolute inset-0 bg-linear-to-r from-bg via-bg/65 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <FadeIn>
            <p className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.24em] text-accent">
              Strategic Talent Partners
            </p>
          </FadeIn>

          <AnimatedHeadline
            lines={["Great people.", "Extraordinary business."]}
            className="text-display-1 font-medium text-ink"
            startDelay={0.15}
          />

          <FadeIn
            delay={0.65}
            className="mt-8 max-w-lg text-lg leading-relaxed text-muted sm:text-xl"
          >
            We connect ambitious businesses with exceptional people through
            thoughtful recruitment, industry expertise, and lasting
            partnerships.
          </FadeIn>

          <FadeIn
            delay={0.8}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="/employers">Find Your Next Hire</Button>
            <Button href="/careers" variant="secondary">
              Explore Opportunities
            </Button>
          </FadeIn>

          <FadeIn
            delay={0.95}
            className="mt-14 flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-muted"
          >
            <span className="h-px w-8 bg-line" aria-hidden />
            Built around people. Focused on progress.
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
