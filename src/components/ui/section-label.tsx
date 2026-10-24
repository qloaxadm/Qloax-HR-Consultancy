import type { ElementType } from "react";
import { cn } from "@/lib/utils";

export function SectionLabel({
  index,
  label,
  className,
  as: Tag = "p",
}: {
  index?: string;
  label: string;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={cn("eyebrow flex items-center gap-3", className)}>
      {index && <span className="text-accent">{index}</span>}
      {index && <span aria-hidden="true" className="h-px w-6 bg-line" />}
      <span>{label}</span>
    </Tag>
  );
}
