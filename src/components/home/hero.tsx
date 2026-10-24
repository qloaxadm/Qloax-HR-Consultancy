import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { delayStyle } from "@/components/ui/line-reveal";
import { HERO } from "@/content/site";
import { SERVICES } from "@/content/services";
import { HeroField } from "./hero-field";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="hero-glow absolute inset-0" />
        <HeroField className="hero-canvas absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/30 to-transparent" />
        <div className="absolute inset-0 hidden bg-linear-to-r from-bg/90 via-bg/35 to-transparent lg:block" />
      </div>

      <Container className="flex flex-1 flex-col justify-end pb-12 pt-36 md:justify-center md:pb-16">
        <p className="eyebrow rise-in flex items-center gap-3 text-ink/80" style={delayStyle(80)}>
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          {HERO.eyebrow}
        </p>

        <h1 className="mt-6 text-hero font-medium text-ink md:mt-8">
          <span className="line-mask">
            <span style={delayStyle(160)}>{HERO.lines[0]}</span>
          </span>
          <span className="line-mask md:inline-block lg:pl-[1.1em]">
            <span style={delayStyle(280)}>{HERO.lines[1]}</span>
          </span>
          <span className="line-mask pl-[1.3em] md:ml-[0.2em] md:inline-block md:pl-0">
            <span style={delayStyle(400)}>
              {HERO.lines[2].replace(/\.$/, "")}
              <span className="text-accent">.</span>
            </span>
          </span>
        </h1>

        <div className="mt-9 flex flex-col gap-8 md:mt-12 lg:pl-[calc(var(--text-hero)*1.1)] xl:flex-row xl:items-end xl:gap-16">
          <p className="rise-in max-w-[30rem] text-lead text-muted" style={delayStyle(620)}>
            {HERO.supporting}
          </p>
          <div className="rise-in flex flex-wrap gap-3" style={delayStyle(760)}>
            <Button href={HERO.primaryCta.href}>{HERO.primaryCta.label}</Button>
            <Button href={HERO.secondaryCta.href} variant="secondary">
              {HERO.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>

      <Container className="hidden pb-7 md:block">
        <div
          className="fade-in flex items-center justify-between border-t border-line/70 pt-5"
          style={delayStyle(1100)}
        >
          <a href="#consultancy" className="eyebrow group flex items-center gap-3 transition-colors hover:text-ink">
            <span aria-hidden="true" className="relative h-7 w-px overflow-hidden bg-line">
              <span className="scroll-cue absolute inset-0 bg-accent" />
            </span>
            Scroll to explore
          </a>
          <nav aria-label="Services overview" className="flex gap-7 lg:gap-10">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="eyebrow transition-colors duration-300 hover:text-ink"
              >
                <span className="text-accent">{service.number}</span> {service.shortTitle}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </section>
  );
}
