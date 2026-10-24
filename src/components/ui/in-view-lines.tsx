"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT, VIEWPORT_ONCE } from "@/lib/motion";

export function InViewLines({
  lines,
  className,
  delay = 0,
  as: Tag = "h2",
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
}) {
  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
          <motion.span
            data-reveal
            className="block"
            initial={{ y: "108%" }}
            whileInView={{ y: "0%" }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 1.15, ease: EASE_OUT, delay: delay + index * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
