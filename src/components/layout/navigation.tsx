"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Wordmark } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LEGAL_NAV, PRIMARY_NAV } from "@/content/site";
import { SERVICES } from "@/content/services";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function ActiveDot() {
  return (
    <motion.span
      layoutId="nav-active"
      aria-hidden="true"
      className="absolute -bottom-2.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent"
      transition={{ duration: 0.5, ease: EASE_OUT }}
    />
  );
}

function ServicesMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const active = isActivePath(pathname, "/services");

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const schedule = (next: boolean, delay: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(next), delay);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onPointerEnter={(event) => event.pointerType === "mouse" && schedule(true, 90)}
      onPointerLeave={(event) => event.pointerType === "mouse" && schedule(false, 180)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="services-menu"
        onClick={() => {
          window.clearTimeout(timer.current);
          setOpen((value) => !value);
        }}
        className={cn(
          "relative flex items-center gap-1.5 py-2 text-sm transition-colors duration-300 hover:text-ink",
          active || open ? "text-ink" : "text-muted",
        )}
      >
        Services
        <ChevronDown
          aria-hidden
          className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")}
        />
        {active && <ActiveDot />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="services-menu"
            initial={{ opacity: 0, y: -6, clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ opacity: 0, y: -6, clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="absolute left-1/2 top-full z-10 mt-5 w-[min(40rem,calc(100vw-4rem))] -translate-x-1/2 rounded-[2px] border border-line bg-surface p-2 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)]"
          >
            <ul className="grid grid-cols-2 gap-px">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block rounded-[2px] p-5 transition-colors duration-300 hover:bg-surface-raised focus-visible:bg-surface-raised"
                  >
                    <span className="flex items-center justify-between font-mono text-xs text-muted">
                      <span className="transition-colors duration-300 group-hover:text-accent">{service.number}</span>
                      <ArrowRight
                        aria-hidden
                        className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </span>
                    <span className="mt-3 block text-base font-medium text-ink">{service.title}</span>
                    <span className="mt-1.5 block text-[13px] leading-relaxed text-muted">{service.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex items-center justify-between border-t border-line px-5 pb-3 pt-4 text-sm">
              <Link href="/services" className="link-underline text-ink">
                All services
              </Link>
              <Link href="/employers#enquiry" className="link-underline text-muted hover:text-ink">
                Discuss a hiring need
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      headerRef.current?.querySelector<HTMLElement>("[data-menu-first]")?.focus();
    } else if (wasOpen.current) {
      wasOpen.current = false;
      toggleRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !headerRef.current) return;
      const focusable = Array.from(
        headerRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbar}px`;
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "drop-in fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500",
        open
          ? "border-transparent bg-bg"
          : scrolled
            ? "border-line/80 bg-bg/80 backdrop-blur-md"
            : "border-transparent bg-transparent",
      )}
    >
      <Container className="relative z-10 flex h-[4.5rem] items-center justify-between gap-6">
        <Wordmark />

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          <ServicesMenu pathname={pathname} />
          {PRIMARY_NAV.filter((link) => link.href !== "/services").map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-2 text-sm transition-colors duration-300 hover:text-ink",
                  active ? "text-ink" : "text-muted",
                )}
              >
                {link.label}
                {active && <ActiveDot />}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <Link href="/careers" className="link-underline text-sm text-ink">
            Find Jobs
          </Link>
          <Button href="/employers#enquiry" size="sm" icon={false}>
            Hire Talent
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className="relative -mr-2 flex size-11 items-center justify-center lg:hidden"
        >
          <span
            aria-hidden="true"
            className={cn(
              "absolute h-px w-6 bg-ink transition-transform duration-500 ease-out-expo",
              open ? "rotate-45" : "-translate-y-[4px]",
            )}
          />
          <span
            aria-hidden="true"
            className={cn(
              "absolute h-px w-6 bg-ink transition-transform duration-500 ease-out-expo",
              open ? "-rotate-45" : "translate-y-[4px]",
            )}
          />
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="fixed inset-0 z-0 flex flex-col overflow-y-auto bg-bg pt-[4.5rem] lg:hidden"
          >
            <Container className="flex flex-1 flex-col pb-8 pt-6">
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
                className="border-t border-line"
              >
                {PRIMARY_NAV.map((link, index) => (
                  <motion.li
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
                    }}
                    className="border-b border-line"
                  >
                    <Link
                      href={link.href}
                      data-menu-first={index === 0 ? true : undefined}
                      aria-current={isActivePath(pathname, link.href) ? "page" : undefined}
                      className="flex items-baseline justify-between py-4 text-[2rem] font-medium tracking-[-0.03em] text-ink sm:text-4xl"
                    >
                      {link.label}
                      <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
                    </Link>
                    {link.href === "/services" && (
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-2 pb-5">
                        {SERVICES.map((service) => (
                          <li key={service.slug}>
                            <Link href={`/services/${service.slug}`} className="text-sm text-muted transition-colors hover:text-ink">
                              {service.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.45 }}
                className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row"
              >
                <Button href="/employers#enquiry">Hire Talent</Button>
                <Button href="/careers" variant="secondary">
                  Find Jobs
                </Button>
              </motion.div>
              <div className="mt-8 flex gap-6 text-xs text-muted">
                {LEGAL_NAV.map((link) => (
                  <Link key={link.href} href={link.href} className="hover:text-ink">
                    {link.label}
                  </Link>
                ))}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
