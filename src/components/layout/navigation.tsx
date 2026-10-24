"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PRIMARY_NAV } from "@/content/site";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      firstLinkRef.current?.focus();
    } else if (wasOpen.current) {
      toggleRef.current?.focus();
      wasOpen.current = false;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled || open
          ? "border-line bg-bg/90 backdrop-blur-xl"
          : "border-transparent bg-bg/30 backdrop-blur-md",
      )}
    >
      <Container className="flex h-[72px] items-center justify-between">
        <Wordmark />

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary"
        >
          {PRIMARY_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm text-muted transition-colors duration-200 hover:text-ink",
                pathname === link.href && "text-ink",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/careers"
            className="text-sm text-muted transition-colors duration-200 hover:text-ink"
          >
            Find Jobs
          </Link>
          <Button href="/employers" icon={false} className="px-5 py-2.5 text-xs">
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
          className="inline-flex size-10 items-center justify-center text-ink lg:hidden"
        >
          {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="border-b border-line bg-bg lg:hidden"
          >
            <Container className="flex flex-col py-4">
              {PRIMARY_NAV.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  className="border-b border-line/60 py-4 text-2xl text-ink transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/careers"
                className="border-b border-line/60 py-4 text-2xl text-ink transition-colors hover:text-accent"
              >
                Find Jobs
              </Link>
              <div className="mt-6 flex flex-col gap-3 pb-4">
                <Button href="/employers" variant="primary">
                  Hire Talent
                </Button>
                <Button href="/candidate-registration" variant="secondary">
                  Introduce Yourself
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
