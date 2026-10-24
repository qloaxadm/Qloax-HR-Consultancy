import Link from "next/link";
import { Wordmark } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { FOOTER_NAV, LEGAL_NAV, SITE } from "@/content/site";
import { FooterWordmark } from "./footer-wordmark";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg">
      <Container className="pt-20 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Wordmark size="lg" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">{SITE.description}</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
            {FOOTER_NAV.map((group) => (
              <div key={group.heading}>
                <p className="eyebrow">{group.heading}</p>
                <ul className="mt-5 space-y-3.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="link-underline text-sm text-ink/85 transition-colors duration-300 hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </Container>

      <Container className="mt-20 md:mt-28">
        <FooterWordmark name={SITE.name} />
      </Container>

      <Container>
        <div className="flex flex-col gap-4 border-t border-line py-7 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_NAV.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors duration-300 hover:text-ink">
                {link.label}
              </Link>
            ))}
            <a href="#main-content" className="transition-colors duration-300 hover:text-ink">
              Back to top ↑
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
