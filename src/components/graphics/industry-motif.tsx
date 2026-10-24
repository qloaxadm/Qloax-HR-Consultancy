"use client";

import { motion } from "motion/react";
import type { IndustryMotif as Motif } from "@/lib/types";
import { EASE_OUT, VIEWPORT_ONCE } from "@/lib/motion";

const SHAPES: Record<Motif, { lines: string[]; accent: string }> = {
  circuit: {
    lines: ["M4 50H28V22H52V42H76V14H108", "M28 50V58H64V42"],
    accent: "M76 14m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0",
  },
  truss: {
    lines: ["M4 52H108M4 20H108", "M4 52L20 20L36 52L52 20L68 52L84 20L100 52"],
    accent: "M52 20m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0",
  },
  ascent: {
    lines: ["M4 58H108", "M4 54H24V44H44V34H64V24H84V12H104"],
    accent: "M104 12m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0",
  },
  pulse: {
    lines: ["M4 36H32L40 20L50 52L58 10L66 46L72 36H108"],
    accent: "M58 10m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0",
  },
  columns: {
    lines: ["M8 22L56 6L104 22Z", "M20 28V54M44 28V54M68 28V54M92 28V54", "M6 58H106"],
    accent: "M56 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
  },
  flow: {
    lines: ["M4 42C24 8 44 8 56 32S88 56 104 22"],
    accent: "M94 21L104 22L101 32",
  },
};

export function IndustryMotif({ motif, className }: { motif: Motif; className?: string }) {
  const shape = SHAPES[motif];
  return (
    <svg
      viewBox="0 0 112 64"
      fill="none"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {shape.lines.map((d, index) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.15 + index * 0.15 }}
        />
      ))}
      <motion.path
        d={shape.accent}
        className="stroke-accent transition-[fill] duration-500 group-hover:fill-accent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.6, delay: 1 }}
      />
    </svg>
  );
}
