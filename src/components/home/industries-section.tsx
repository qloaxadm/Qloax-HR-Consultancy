import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/stagger";
import { IndustryMotif } from "@/components/graphics/industry-motif";
import { INDUSTRIES } from "@/content/industries";

export function IndustriesSection() {
  return (
    <section className="border-t border-line bg-surface/40 py-24 md:py-32 lg:py-40">
      <Container>
        <div className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <Reveal className="lg:col-span-8">
            <SectionLabel index="03" label="Industries" />
            <h2 className="mt-6 text-display font-medium text-ink">
              Built around the industries shaping tomorrow.
            </h2>
          </Reveal>
        </div>

        <StaggerGroup
          as="ul"
          stagger={0.07}
          className="mt-14 grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 md:mt-20 lg:grid-cols-3"
        >
          {INDUSTRIES.map((industry, index) => (
            <StaggerItem as="li" key={industry.slug} className="border-b border-r border-line">
              <Link
                href={`/industries#${industry.slug}`}
                className="group flex h-full flex-col justify-between gap-14 p-7 transition-colors duration-500 hover:bg-surface-raised sm:p-9 lg:min-h-[21rem]"
              >
                <IndustryMotif
                  motif={industry.motif}
                  className="h-14 w-24 text-muted transition-colors duration-500 group-hover:text-ink"
                />
                <div>
                  <span className="font-mono text-xs text-muted transition-colors duration-500 group-hover:text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-2xl font-medium tracking-[-0.02em] text-ink">
                    {industry.name}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{industry.description}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
