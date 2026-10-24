"use client";

import { motion } from "motion/react";
import { EASE_OUT, VIEWPORT_ONCE } from "@/lib/motion";

export function AnimatedHeadline({
  lines,
  className,
  startDelay = 0,
  as = "h1",
  trigger = "mount",
}: {
  lines: string[];
  className?: string;
  startDelay?: number;
  as?: "h1" | "h2" | "p";
  trigger?: "mount" | "inView";
}) {
  const Tag = as;
  let wordIndex = 0;

  return (
    <Tag className={className}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split(" ").map((word) => {
            const delay = startDelay + wordIndex * 0.07;
            wordIndex += 1;
            const key = `${lineIndex}-${word}-${wordIndex}`;
            return (
              <span
                key={key}
                className="inline-block overflow-hidden pb-1 pr-[0.22em] align-bottom"
              >
                {trigger === "inView" ? (
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    whileInView={{ y: "0%" }}
                    viewport={VIEWPORT_ONCE}
                    transition={{ duration: 0.75, ease: EASE_OUT, delay }}
                  >
                    {word}
                  </motion.span>
                ) : (
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.75, ease: EASE_OUT, delay }}
                  >
                    {word}
                  </motion.span>
                )}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
