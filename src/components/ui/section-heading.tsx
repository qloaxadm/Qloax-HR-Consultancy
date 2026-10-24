import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(align === "center" && "text-center", className)}
    >
      {eyebrow && (
        <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.22em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="text-display-2 font-medium text-balance text-ink">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-xl text-lg leading-relaxed text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
