import { cn } from "@/lib/utils";

export function DevRecordsBadge({ className, label = "Development records — not live vacancies" }: { className?: string; label?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-[2px] border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent/70" />
      {label}
    </p>
  );
}
