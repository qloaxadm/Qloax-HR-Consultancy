"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { MethodologyStep } from "@/lib/types";

/**
 * The connecting line draws as the reader scrolls and each step lights up
 * when the line reaches it. Without JavaScript, or with reduced motion,
 * the finished state renders: full line, every step active.
 */
export function ProcessTimeline({ steps }: { steps: MethodologyStep[] }) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const items = Array.from(list.querySelectorAll<HTMLElement>("[data-step]"));
    let limits = items.map(() => 0);
    const measure = () => {
      limits = items.map((item) => (item.offsetTop + 16) / list.offsetHeight);
    };
    const apply = (progress: number) => {
      list.style.setProperty("--progress", progress.toFixed(4));
      items.forEach((item, index) => {
        item.dataset.active = String(progress >= limits[index]);
      });
    };

    measure();
    const trigger = ScrollTrigger.create({
      trigger: list,
      start: "top 68%",
      end: "bottom 62%",
      onUpdate: (self) => apply(self.progress),
      onRefresh: (self) => {
        measure();
        apply(self.progress);
      },
    });
    apply(trigger.progress);

    return () => {
      trigger.kill();
      list.style.removeProperty("--progress");
      items.forEach((item) => (item.dataset.active = "true"));
    };
  }, []);

  return (
    <ol ref={listRef} className="relative" style={{ "--progress": 1 } as CSSProperties}>
      <span aria-hidden="true" className="absolute bottom-3 left-[11px] top-3 w-px bg-line" />
      <span
        aria-hidden="true"
        className="absolute bottom-3 left-[11px] top-3 w-px origin-top bg-accent"
        style={{ transform: "scaleY(var(--progress))" }}
      />
      {steps.map((step) => (
        <li key={step.index} data-step data-active="true" className="group relative pb-16 pl-14 last:pb-0 md:pl-20">
          <span
            aria-hidden="true"
            className="absolute left-0 top-1 flex size-[23px] items-center justify-center rounded-full border border-line bg-bg transition-colors duration-500 group-data-[active=true]:border-accent/70"
          >
            <span className="size-1.5 rounded-full bg-line transition-colors duration-500 group-data-[active=true]:bg-accent" />
          </span>
          <span className="font-mono text-xs text-muted">{step.index}</span>
          <h3 className="mt-2 text-title font-medium text-ink/40 transition-colors duration-700 group-data-[active=true]:text-ink">
            {step.title}
          </h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{step.description}</p>
          <p className="mt-5 flex items-center gap-3 text-sm text-ink/85">
            <span aria-hidden="true" className="h-px w-5 bg-accent" />
            {step.outcome}
          </p>
        </li>
      ))}
    </ol>
  );
}
