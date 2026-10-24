import Link from "next/link";
import { ArrowRight, Target, Search, Layers, Compass } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/stagger";
import { SERVICES } from "@/content/services";
import type { Service } from "@/lib/types";

const ICONS: Record<Service["icon"], typeof Target> = {
  target: Target,
  search: Search,
  layers: Layers,
  compass: Compass,
};

export function ServicesOverview() {
  return (
    <Section border>
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.22em] text-accent">
              What We Do
            </p>
            <h2 className="text-display-2 max-w-xl font-medium text-balance text-ink">
              People solutions for ambitious businesses.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
            >
              View all services
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <StaggerGroup className="mt-14 border-b border-line lg:mt-20">
          {SERVICES.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-t border-line px-1 py-8 transition-colors duration-300 hover:bg-surface sm:px-4 lg:grid-cols-[80px_1fr_auto_auto] lg:gap-10 lg:px-6"
                >
                  <span className="font-mono text-sm text-muted">
                    {service.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium text-ink sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-muted sm:text-base">
                      {service.summary}
                    </p>
                  </div>
                  <Icon
                    className="hidden size-5 text-muted transition-colors duration-300 group-hover:text-accent lg:block"
                    aria-hidden
                  />
                  <ArrowRight
                    className="size-5 shrink-0 text-ink transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
                    aria-hidden
                  />
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
