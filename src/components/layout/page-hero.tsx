import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { LineReveal, delayStyle } from "@/components/ui/line-reveal";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  actions,
  aside,
}: {
  eyebrow: string;
  title: string[];
  description?: ReactNode;
  crumbs?: Crumb[];
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <div aria-hidden="true" className="hairline-grid absolute inset-0 -z-10 opacity-35" />
      <Container className="pb-16 pt-32 md:pb-24 md:pt-40">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className="mt-10 grid gap-y-12 md:mt-14 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className={aside ? "lg:col-span-7" : "lg:col-span-10"}>
            <p className="eyebrow rise-in flex items-center gap-3 text-ink/80" style={delayStyle(60)}>
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              {eyebrow}
            </p>
            <LineReveal lines={title} startDelay={140} className="mt-6 text-display font-medium text-ink" />
            {description && (
              <div className="rise-in mt-8 max-w-2xl text-lead text-muted" style={delayStyle(420)}>
                {description}
              </div>
            )}
            {actions && (
              <div className="rise-in mt-10 flex flex-wrap gap-3" style={delayStyle(540)}>
                {actions}
              </div>
            )}
          </div>
          {aside && (
            <div className="rise-in lg:col-span-4 lg:col-start-9" style={delayStyle(480)}>
              {aside}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
