import { PageHero } from "@/components/layout/page-hero";
import { SplitCta } from "@/components/layout/split-cta";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { MaskImage } from "@/components/ui/mask-image";
import { ProcessSteps } from "@/components/ui/process-steps";
import { StaggerGroup, StaggerItem } from "@/components/ui/stagger";
import { MEDIA } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Vantage People is a recruitment and talent consultancy built on a simple idea: the right person in the right role changes what a business can achieve.",
  path: "/about",
});

const PRINCIPLES = [
  {
    title: "Fit over speed",
    text: "A fast hire that doesn't last costs more than a considered one that does. We optimize for long-term fit — for the business and the person.",
  },
  {
    title: "Honesty on both sides",
    text: "Employers and candidates both deserve an accurate picture of the role, the team, and the opportunity — including the parts that are hard to hear.",
  },
  {
    title: "Respect for every candidate",
    text: "Everyone we speak with gets a clear, timely, human response, whether or not they are right for this particular role.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About" }]}
        eyebrow="About Vantage People"
        title={["We help good businesses", "find great people."]}
        description="Vantage People is a recruitment and talent consultancy built on a simple idea: the right person in the right role changes what a business can achieve."
      />

      <section className="py-24 md:py-32 lg:py-40">
        <Container className="grid gap-y-14 lg:grid-cols-12 lg:items-center lg:gap-x-10">
          <MaskImage
            media={MEDIA.buildingCorner}
            sizes="(min-width: 1024px) 38vw, 100vw"
            eager
            parallax={4}
            className="aspect-[4/5] sm:aspect-[4/3] lg:col-span-5 lg:aspect-[4/5]"
            imageClassName="object-[50%_35%]"
          />
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <SectionLabel label="Our approach" />
            <h2 className="mt-6 text-display font-medium text-ink">Recruitment works best as a partnership.</h2>
            <div className="mt-8 space-y-5 text-lead text-muted">
              <p>
                We work as an extension of the teams we hire for — learning how the business runs, what the role
                really needs, and what kind of person will thrive there.
              </p>
              <p>
                For candidates, we aim to be the recruiter you would recommend to a friend: clear about the
                opportunity, honest about fit, and respectful of your time.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line bg-surface/40 py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionLabel label="What we believe" />
            <h2 className="mt-6 max-w-3xl text-display font-medium text-ink">Principles that shape every search.</h2>
          </Reveal>
          <StaggerGroup as="ol" className="mt-14 border-t border-line md:mt-20">
            {PRINCIPLES.map((principle, index) => (
              <StaggerItem
                as="li"
                key={principle.title}
                className="grid gap-4 border-b border-line py-10 md:grid-cols-12 md:items-baseline md:gap-10 md:py-12"
              >
                <span className="font-mono text-xs text-accent md:col-span-1">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-title font-medium text-ink md:col-span-5">{principle.title}</h3>
                <p className="max-w-xl text-base leading-relaxed text-muted md:col-span-6">{principle.text}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionLabel label="How we work" />
            <h2 className="mt-6 max-w-3xl text-display font-medium text-ink">A clear process, from brief to first day.</h2>
          </Reveal>
          <Reveal className="mt-14 md:mt-20">
            <ProcessSteps />
          </Reveal>
        </Container>
      </section>

      <SplitCta />
    </>
  );
}
