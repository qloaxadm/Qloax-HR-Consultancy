import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";
type Size = "md" | "sm";

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  icon?: boolean;
  className?: string;
  children: ReactNode;
  href?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const base =
  "group relative inline-flex select-none items-center justify-center gap-3 whitespace-nowrap rounded-[2px] font-medium tracking-[-0.005em] transition-[background-color,border-color,color,transform] duration-300 ease-out-expo active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-accent-hover",
  secondary: "border border-line bg-bg/40 text-ink hover:border-ink/35 hover:bg-surface",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-sm",
  sm: "h-10 px-4 text-[13px]",
};

function RollLabel({ children }: { children: ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  icon = true,
  className,
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      <RollLabel>{children}</RollLabel>
      {icon && (
        <ArrowRight
          className="size-4 shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5"
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
