import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AnimatedHeadline } from "@/components/ui/animated-headline";
import { Reveal } from "@/components/ui/reveal";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-bg py-28 text-center sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/10 blur-3xl"
      />
      <Container className="relative z-10 flex flex-col items-center">
        <AnimatedHeadline
          lines={["Let's find the right fit."]}
          className="text-display-2 text-center font-medium text-ink"
          trigger="inView"
          as="h2"
        />
        <Reveal
          delay={0.15}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
        >
          Whether you&apos;re building a team or planning your next move,
          let&apos;s start a conversation.
        </Reveal>
        <Reveal
          delay={0.25}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="/employers">Hire Talent</Button>
          <Button href="/careers" variant="secondary">
            Explore Careers
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
