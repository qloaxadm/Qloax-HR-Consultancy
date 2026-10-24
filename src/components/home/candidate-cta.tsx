import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { InViewLines } from "@/components/ui/in-view-lines";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { MaskImage } from "@/components/ui/mask-image";
import { MEDIA } from "@/content/media";

export function CandidateCta() {
  return (
    <section className="border-t border-line py-24 md:py-32 lg:py-40">
      <Container className="grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-10">
        <MaskImage
          media={MEDIA.harpaWindow}
          sizes="(min-width: 1024px) 40vw, 100vw"
          reveal="up"
          parallax={4}
          className="aspect-[4/5] sm:aspect-[5/4] lg:col-span-5 lg:aspect-[4/5]"
          imageClassName="object-[62%_50%]"
        />
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <SectionLabel label="For candidates" />
          </Reveal>
          <InViewLines
            lines={["Your next opportunity", "should take you", "somewhere meaningful."]}
            className="mt-6 text-display font-medium text-ink"
          />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md text-lead text-muted">
              Share your experience and career goals so we can consider you for relevant opportunities
              as they come up.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/candidate-registration">Introduce Yourself</Button>
              <Button href="/careers" variant="secondary">
                Browse roles
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
