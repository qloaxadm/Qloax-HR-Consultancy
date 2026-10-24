import type { ReactNode } from "react";
import { PageHero } from "./page-hero";
import { Container } from "@/components/ui/container";

export function LegalPage({ title, label, children }: { title: string; label: string; children: ReactNode }) {
  return (
    <>
      <PageHero crumbs={[{ label }]} eyebrow="Legal" title={[title]} />
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7 lg:col-start-3">
              <div role="note" className="mb-12 rounded-[2px] border border-accent/30 bg-accent/[0.04] p-5 text-sm leading-relaxed text-ink/85">
                <strong className="font-medium text-ink">Draft template.</strong> This document must be reviewed by a
                qualified legal professional and completed with the company&apos;s registered details before the site goes
                live. Bracketed items are pending client information.
              </div>
              <div className="prose-vp">{children}</div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
