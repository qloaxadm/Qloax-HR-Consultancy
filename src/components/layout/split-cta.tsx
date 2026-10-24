import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const PANELS = [
  {
    href: "/employers#enquiry",
    eyebrow: "For employers",
    title: "Discuss a hiring need",
    text: "Tell us about the role and we'll help you shape a focused, realistic search.",
  },
  {
    href: "/candidate-registration",
    eyebrow: "For candidates",
    title: "Introduce yourself",
    text: "Share your experience and goals so we can consider you as relevant roles come up.",
  },
];

export function SplitCta() {
  return (
    <section aria-label="Get started" className="border-t border-line">
      <div className="grid md:grid-cols-2">
        {PANELS.map((panel, index) => (
          <Link
            key={panel.href}
            href={panel.href}
            className={`group flex min-h-[20rem] flex-col justify-between gap-12 p-8 transition-colors duration-500 hover:bg-surface sm:p-12 lg:min-h-[24rem] lg:p-16 ${
              index === 0 ? "border-b border-line md:border-b-0 md:border-r" : ""
            }`}
          >
            <span className="eyebrow">{panel.eyebrow}</span>
            <span className="flex items-end justify-between gap-8">
              <span>
                <span className="block text-title font-medium text-ink">{panel.title}</span>
                <span className="mt-3 block max-w-sm text-sm leading-relaxed text-muted">{panel.text}</span>
              </span>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-[background-color,border-color,color,transform] duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                <ArrowUpRight aria-hidden className="size-5" />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
