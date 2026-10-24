import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const POINTS = [
  "Faster, more confident hiring decisions",
  "Stronger alignment between talent and business strategy",
];

export function Introduction() {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="text-display-2 font-medium text-balance text-ink">
              Talent is a business decision.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted">
              The right hire can transform a team, strengthen a culture, and
              unlock new opportunities. We help businesses identify the
              people they need to move forward — and help professionals
              find roles where they can thrive.
            </p>
            <ul className="mt-8 space-y-4 border-t border-line pt-8">
              {POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm text-ink/80"
                >
                  <span
                    className="mt-2.5 h-px w-4 shrink-0 bg-accent"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
