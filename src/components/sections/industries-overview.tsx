import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/ui/stagger";
import { INDUSTRIES } from "@/content/industries";

export function IndustriesOverview() {
  return (
    <Section surface="bg-secondary" border>
      <Container>
        <SectionHeading
          eyebrow="Our Expertise"
          title="Built around the industries shaping tomorrow."
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {INDUSTRIES.map((industry, index) => (
            <StaggerItem key={industry.slug}>
              <div className="group h-full border-b border-r border-line p-8 transition-colors duration-300 hover:bg-bg sm:p-10">
                <span className="font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-medium text-ink">
                  {industry.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {industry.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
