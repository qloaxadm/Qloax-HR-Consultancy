import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  variant?: Variant;
  icon?: boolean;
  className?: string;
  children: ReactNode;
  href?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const base =
  "group inline-flex items-center gap-2.5 whitespace-nowrap rounded-sm px-6 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-ink",
  secondary: "border border-line text-ink hover:border-accent hover:text-accent",
  ghost: "text-ink hover:text-accent px-0",
};

export function Button({
  variant = "primary",
  icon = true,
  className,
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
