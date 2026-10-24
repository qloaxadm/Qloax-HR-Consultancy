import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-sm text-ink transition-colors duration-300 hover:text-accent",
        className,
      )}
    >
      <span className="link-underline pb-0.5">{children}</span>
      <ArrowRight
        className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
        aria-hidden
      />
    </Link>
  );
}
