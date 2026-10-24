import { PageHero } from "@/components/layout/page-hero";
import { SplitCta } from "@/components/layout/split-cta";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ArrowLink } from "@/components/ui/arrow-link";
import { IndustryMotif } from "@/components/graphics/industry-motif";
import { INDUSTRIES } from "@/content/industries";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries",
  description:
    "Recruitment focus across technology, engineering and manufacturing, financial services, healthcare and life sciences, professional services, and commercial roles.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Industries" }]}
        eyebrow="Industries"
        title={["Built around the industries", "shaping tomorrow."]}
        description="We focus on sectors where the right people make an outsized difference — and where understanding the business matters as much as understanding the role."
      />

      <section className="py-12 md:py-20">
        <Container>
          {INDUSTRIES.map((industry, index) => (
            <Reveal key={industry.slug}>
              <article
                id={industry.slug}
                className="group grid gap-8 border-b border-line py-14 md:py-16 lg:grid-cols-12 lg:items-start lg:gap-x-10"
              >
                <span className="font-mono text-xs text-accent lg:col-span-1">{String(index + 1).padStart(2, "0")}</span>
                <div className="lg:col-span-5">
                  <h2 className="text-title font-medium text-ink">{industry.name}</h2>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-muted md:text-lg">{industry.description}</p>
                </div>
                <div className="lg:col-span-4 lg:col-start-8">
                  <p className="eyebrow">Typical roles</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {industry.roles.map((role) => (
                      <li key={role} className="rounded-full border border-line px-3.5 py-1.5 text-[13px] text-ink/85">
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>
                <IndustryMotif
                  motif={industry.motif}
                  className="hidden h-14 w-24 justify-self-end text-muted transition-colors duration-500 group-hover:text-ink lg:col-span-2 lg:block"
                />
              </article>
            </Reveal>
          ))}

          <Reveal className="flex flex-col gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
            <p className="max-w-xl text-lead text-muted">
              Hiring in a sector that isn&apos;t listed? Tell us about the role — the fundamentals of a good search
              travel well.
            </p>
            <ArrowLink href="/contact">Talk to us</ArrowLink>
          </Reveal>
        </Container>
      </section>

      <SplitCta />
    </>
  );
}
