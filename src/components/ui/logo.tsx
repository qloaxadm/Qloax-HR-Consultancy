import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE } from "@/content/site";

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2.5 3.5L12 20.5L21.5 3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <circle cx="12" cy="20.5" r="1.5" className="fill-accent" />
    </svg>
  );
}

export function Wordmark({
  className,
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "lg";
}) {
  const [first, ...rest] = SITE.name.toUpperCase().split(" ");

  return (
    <Link
      href="/"
      aria-label={`${SITE.name} — Home`}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <LogoMark
        className={cn(
          "text-ink transition-colors duration-300 group-hover:text-accent",
          size === "sm" ? "size-4" : "size-6",
        )}
      />
      <span
        className={cn(
          "font-mono font-medium uppercase tracking-[0.16em] text-ink",
          size === "sm" ? "text-sm" : "text-base",
        )}
      >
        {first}
        {rest.length > 0 && (
          <span className="text-muted"> {rest.join(" ")}</span>
        )}
      </span>
    </Link>
  );
}
