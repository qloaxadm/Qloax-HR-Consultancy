"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/lib/motion";

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 16,
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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
