"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ServiceGlyph } from "@/components/graphics/service-glyph";
import { ArrowLink } from "@/components/ui/arrow-link";
import type { Service } from "@/lib/types";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ServicesExplorer({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <ul className="border-t border-line lg:col-span-7">
        {services.map((service, index) => {
          const isActive = index === active;
          return (
            <li key={service.slug} className="relative border-b border-line">
              {isActive && (
                <motion.span
                  layoutId="service-indicator"
                  aria-hidden="true"
                  className="absolute -top-px left-0 hidden h-px w-full bg-accent lg:block"
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                />
              )}
              <Link
                href={`/services/${service.slug}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                data-active={isActive}
                className="group flex items-start gap-5 py-7 transition-[background-color,transform] duration-300 active:scale-[0.995] active:bg-surface/60 md:gap-8 lg:items-center lg:py-9"
              >
                <span
                  className={cn(
                    "mt-2 font-mono text-xs transition-colors duration-500 lg:mt-0",
                    isActive ? "text-accent" : "text-muted",
                  )}
                >
                  {service.number}
                </span>
                <span className="flex-1">
                  <span
                    className={cn(
                      "block text-title font-medium transition-[color,transform] duration-500 ease-out-expo",
                      isActive ? "text-ink lg:translate-x-2" : "text-ink lg:text-ink/45",
                    )}
                  >
                    {service.title}
                  </span>
                  <span className="mt-3 block max-w-md text-sm leading-relaxed text-muted lg:hidden">
                    {service.summary}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className={cn(
                    "mt-1.5 size-5 shrink-0 transition-[color,transform] duration-500 ease-out-expo lg:mt-0",
                    isActive ? "text-accent lg:translate-x-0.5 lg:-translate-y-0.5" : "text-muted",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28 min-h-[30rem] rounded-[2px] border border-line bg-surface p-10 xl:p-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              <div className="flex items-start justify-between">
                <ServiceGlyph glyph={current.glyph} className="size-28" />
                <span className="font-mono text-xs text-muted">
                  {current.number} / {String(services.length).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-10 text-2xl font-medium leading-snug tracking-[-0.02em] text-ink">
                {current.summary}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{current.description}</p>
              <ul className="mt-8 space-y-3 border-t border-line pt-7">
                {current.deliverables.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-ink/85">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <ArrowLink href={`/services/${current.slug}`} className="mt-9">
                Explore {current.title}
              </ArrowLink>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
