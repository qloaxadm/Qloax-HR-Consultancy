import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { LineReveal, delayStyle } from "@/components/ui/line-reveal";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[88svh] items-center overflow-hidden">
      <div aria-hidden="true" className="hairline-grid absolute inset-0 -z-10 opacity-40" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-[4vw] bottom-[-6vw] -z-10 select-none text-[34vw] font-medium leading-none tracking-[-0.06em] text-surface-raised/70"
      >
        404
      </span>
      <Container className="py-40">
        <p className="eyebrow rise-in flex items-center gap-3 text-ink/80">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          Error 404
        </p>
        <LineReveal lines={["This page has", "moved on."]} startDelay={100} className="mt-6 text-hero font-medium text-ink" />
        <p className="rise-in mt-8 max-w-md text-lead text-muted" style={delayStyle(380)}>
          The link may be out of date, or the page may never have existed. Here are a few good places to start.
        </p>
        <div className="rise-in mt-10 flex flex-wrap gap-3" style={delayStyle(500)}>
          <Button href="/">Back to home</Button>
          <Button href="/careers" variant="secondary">
            Browse roles
          </Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </Container>
    </section>
  );
}
