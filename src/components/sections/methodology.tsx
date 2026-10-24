"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { METHODOLOGY_STEPS } from "@/content/methodology";

export function Methodology() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || !triggerRef.current || !trackRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const track = trackRef.current;

    const scrollTrigger = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top 75%",
      end: "bottom 55%",
      scrub: true,
      onUpdate: (self) => {
        track.style.setProperty("--progress", self.progress.toString());
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <Section border>
      <Container>
        <SectionHeading
          eyebrow="How We Work"
          title="Better hiring starts with better understanding."
        />

        <div ref={triggerRef} className="mt-16 lg:mt-24">
          <div
            ref={trackRef}
            className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
            style={{ "--progress": 0 } as CSSProperties}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 hidden h-px w-full bg-line lg:block"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 hidden h-px w-full bg-accent lg:block"
              style={{ transform: "scaleX(var(--progress, 0))", transformOrigin: "left" }}
            />
            {METHODOLOGY_STEPS.map((step) => (
              <div key={step.index} className="relative pt-8 lg:pt-10">
                <span
                  aria-hidden="true"
                  className="absolute -top-[3px] left-0 hidden size-[7px] rounded-full bg-line lg:block"
                />
                <span className="font-mono text-sm text-accent">
                  {step.index}
                </span>
                <h3 className="mt-3 text-xl font-medium text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
