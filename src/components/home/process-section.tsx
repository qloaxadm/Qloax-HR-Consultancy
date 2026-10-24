import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { ArrowLink } from "@/components/ui/arrow-link";
import { METHODOLOGY_STEPS } from "@/content/methodology";
import { ProcessTimeline } from "./process-timeline";

export function ProcessSection() {
  return (
    <section className="border-t border-line py-24 md:py-32 lg:py-44">
      <Container className="grid gap-y-16 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-32">
            <SectionLabel index="04" label="Process" />
            <h2 className="mt-6 text-display font-medium text-ink">
              Better hiring starts with better understanding.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
              A clear, collaborative process that gives employers confidence and treats every candidate
              with respect.
            </p>
            <ArrowLink href="/employers" className="mt-8">
              How we work with employers
            </ArrowLink>
          </Reveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ProcessTimeline steps={METHODOLOGY_STEPS} />
        </div>
      </Container>
    </section>
  );
}
