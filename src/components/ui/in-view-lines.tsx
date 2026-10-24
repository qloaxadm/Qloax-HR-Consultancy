"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT, VIEWPORT_ONCE } from "@/lib/motion";

/* The heading itself is observed: observing each clipped line fails when a line wraps,
   because the offset child sits entirely outside its overflow clip. */
export function InViewLines({
  lines,
  className,
  delay = 0,
  as = "h2",
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: delay } } }}
    >
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
          <motion.span
            data-reveal
            className="block"
            variants={{
              hidden: { y: "108%" },
              visible: { y: "0%", transition: { duration: 1.15, ease: EASE_OUT } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
