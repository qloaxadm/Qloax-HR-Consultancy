import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { InViewLines } from "@/components/ui/in-view-lines";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { MaskImage } from "@/components/ui/mask-image";
import { MEDIA } from "@/content/media";

export function EmployerCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-line">
      <MaskImage
        media={MEDIA.facadeGrid}
        sizes="100vw"
        reveal="center"
        parallax={6}
        className="absolute inset-0 -z-20"
        imageClassName="object-[72%_20%] opacity-80"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-bg via-bg/55 to-bg/20 lg:bg-linear-to-r lg:from-bg/95 lg:via-bg/45 lg:to-transparent"
      />
      <Container className="flex min-h-[82svh] flex-col justify-end py-20 md:min-h-[44rem] md:py-28 lg:min-h-[52rem] lg:justify-center">
        <Reveal>
          <SectionLabel label="For employers" className="text-ink/80" />
        </Reveal>
        <InViewLines
          lines={["Building your next", "great team starts here."]}
          className="mt-6 max-w-4xl text-display font-medium text-ink"
        />
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-lg text-lead text-ink/75">
            Tell us what your team needs. We&apos;ll help you define the role, identify relevant talent,
            and build a focused recruitment plan.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/employers#enquiry">Discuss a Hiring Need</Button>
            <Button href="/employers" variant="secondary">
              How we work
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
