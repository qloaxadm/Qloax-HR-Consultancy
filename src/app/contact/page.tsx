import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { StaggerGroup, StaggerItem } from "@/components/ui/stagger";
import { ContactForm } from "@/components/forms/contact-form";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Start a conversation with Vantage People — about a hiring need, your next role, or anything else.",
  path: "/contact",
});

const ROUTES = [
  {
    href: "/employers#enquiry",
    title: "Hiring for a role?",
    text: "Use the hiring enquiry so we can prepare properly for the first conversation.",
  },
  {
    href: "/candidate-registration",
    title: "Looking for your next role?",
    text: "Register your profile and tell us what you're looking for.",
  },
  {
    href: "/careers",
    title: "Browsing current roles?",
    text: "Search and filter the roles we're working on, and apply directly.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        eyebrow="Contact"
        title={["Let's start a", "conversation."]}
        description="The quickest route depends on what you need. Choose an option below, or send us a general message."
      />

      <section className="py-16 md:py-24">
        <Container>
          <StaggerGroup as="ul" className="grid gap-px overflow-hidden rounded-[2px] border border-line bg-line md:grid-cols-3">
            {ROUTES.map((route) => (
              <StaggerItem as="li" key={route.href} className="bg-bg">
                <Link href={route.href} className="group flex h-full flex-col justify-between gap-10 p-8 transition-colors duration-500 hover:bg-surface md:p-10">
                  <span className="flex items-start justify-between gap-6">
                    <span className="text-2xl font-medium tracking-[-0.02em] text-ink">{route.title}</span>
                    <ArrowUpRight
                      aria-hidden
                      className="mt-1 size-5 shrink-0 text-muted transition-[color,transform] duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </span>
                  <span className="text-sm leading-relaxed text-muted">{route.text}</span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section id="message" className="border-t border-line bg-surface/40 py-24 md:py-32">
        <Container className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <SectionLabel label="General enquiries" />
            <h2 className="mt-6 text-display font-medium text-ink">Send us a message.</h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              Questions about how we work, partnerships, or anything else — we read every message and reply as soon as we
              can.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="rounded-[2px] border border-line bg-bg p-6 sm:p-10">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
