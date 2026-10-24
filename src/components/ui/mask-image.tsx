"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { MediaAsset } from "@/lib/types";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const HIDDEN = {
  up: "inset(100% 0% 0% 0%)",
  center: "inset(12% 9% 12% 9%)",
  left: "inset(0% 100% 0% 0%)",
} as const;

export function MaskImage({
  media,
  sizes,
  className,
  imageClassName,
  reveal = "up",
  parallax = 0,
  eager = false,
}: {
  media: MediaAsset;
  sizes: string;
  className?: string;
  imageClassName?: string;
  reveal?: keyof typeof HIDDEN;
  parallax?: number;
  eager?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [amplitude, setAmplitude] = useState(parallax);

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) setAmplitude(parallax / 2);
  }, [parallax]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amplitude}%`, `${amplitude}%`]);
  const moving = amplitude > 0 && !reduce;

  return (
    <motion.div
      ref={ref}
      data-reveal
      className={cn("relative overflow-hidden bg-surface", className)}
      initial={{ clipPath: HIDDEN[reveal] }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.5, ease: EASE_OUT }}
    >
      <motion.div
        className="absolute inset-0"
        style={moving ? { y, scale: 1 + (amplitude * 2.2) / 100 } : undefined}
      >
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          loading={eager ? "eager" : "lazy"}
          className={cn("object-cover", imageClassName)}
        />
      </motion.div>
    </motion.div>
  );
}
