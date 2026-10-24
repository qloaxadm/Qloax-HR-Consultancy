import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <section className="border-b border-line bg-bg pt-36 pb-16 sm:pt-44 sm:pb-20">
      <Container>
        <Reveal>
          {eyebrow && (
            <p className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.22em] text-accent">
              {eyebrow}
            </p>
          )}
          <h1 className="max-w-3xl text-display-2 font-medium text-balance text-ink">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {description}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
