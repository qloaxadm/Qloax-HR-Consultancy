"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT, VIEWPORT_ONCE } from "@/lib/motion";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
