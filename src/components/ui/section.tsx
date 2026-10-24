import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  surface = "bg",
  id,
  border = false,
}: {
  children: ReactNode;
  className?: string;
  surface?: "bg" | "bg-secondary";
  id?: string;
  border?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-28 lg:py-36",
        surface === "bg-secondary" ? "bg-bg-secondary" : "bg-bg",
        border && "border-t border-line",
        className,
      )}
    >
      {children}
    </section>
  );
}
