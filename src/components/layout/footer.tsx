import Link from "next/link";
import { Wordmark } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FOOTER_NAV, LEGAL_NAV, SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-secondary">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Wordmark size="lg" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {SITE.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href="/employers"
                variant="secondary"
                icon={false}
                className="text-xs"
              >
                Hire Talent
              </Button>
              <Button
                href="/careers"
                variant="ghost"
                icon={false}
                className="text-xs"
              >
                Explore Careers
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {FOOTER_NAV.map((group) => (
              <div key={group.heading}>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  {group.heading}
                </p>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-ink/85 transition-colors duration-200 hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            {LEGAL_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-200 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
