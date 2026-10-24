"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import type { ServiceGlyph as Glyph } from "@/lib/types";
import { ServiceGlyph } from "./service-glyph";

/* Mounts the glyph only once it scrolls into view, so its draw-in animation is actually seen. */
export function InViewGlyph({ glyph, className }: { glyph: Glyph; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    <div ref={ref} className={className}>
      {inView && <ServiceGlyph glyph={glyph} className="size-full" />}
    </div>
  );
}
