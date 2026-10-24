import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { ArrowLink } from "@/components/ui/arrow-link";
import { SERVICES } from "@/content/services";
import { ServicesExplorer } from "./services-explorer";

export function ServicesSection() {
  return (
    <section className="border-t border-line bg-bg py-24 md:py-32 lg:py-40">
      <Container>
        <div className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <Reveal className="lg:col-span-7">
            <SectionLabel index="02" label="Services" />
            <h2 className="mt-6 text-display font-medium text-ink">
              Find the people who move you forward.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-base leading-relaxed text-muted">
              Four ways to work with us — from a single permanent hire to a confidential leadership
              search or a review of how your organization hires.
            </p>
            <ArrowLink href="/services" className="mt-6">
              All services
            </ArrowLink>
          </Reveal>
        </div>
        <div className="mt-14 md:mt-20">
          <ServicesExplorer services={SERVICES} />
        </div>
      </Container>
    </section>
  );
}
