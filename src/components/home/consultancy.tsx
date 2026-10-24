import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { ScrollHighlight } from "@/components/ui/scroll-highlight";
import { MaskImage } from "@/components/ui/mask-image";
import { Reveal } from "@/components/ui/reveal";
import { ArrowLink } from "@/components/ui/arrow-link";
import { MEDIA } from "@/content/media";

const STATEMENT =
  "Every great business is shaped by the people behind it. We help organizations discover the talent that moves them forward, while helping professionals find opportunities that match their ambitions.";

export function Consultancy() {
  return (
    <section id="consultancy" className="py-24 md:py-32 lg:py-44">
      <Container>
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-3">
            <SectionLabel as="h2" index="01" label="The consultancy" />
          </div>
          <ScrollHighlight
            text={STATEMENT}
            className="text-statement font-medium text-ink lg:col-span-9"
          />
        </div>

        <div className="mt-16 grid gap-y-12 md:mt-24 lg:grid-cols-12 lg:gap-x-10">
          <Reveal className="flex flex-col justify-end lg:col-span-4 lg:col-start-4 lg:pb-10">
            <p className="text-base leading-relaxed text-muted md:text-lg">
              From a single critical hire to an entire leadership team, we bring structure, discretion,
              and genuine care to every search — for the businesses we partner with and the people we
              represent.
            </p>
            <ArrowLink href="/about" className="mt-8">
              About Vantage People
            </ArrowLink>
          </Reveal>
          <MaskImage
            media={MEDIA.atriumWalk}
            sizes="(min-width: 1024px) 34vw, 100vw"
            reveal="up"
            parallax={5}
            className="aspect-[4/5] md:aspect-[16/11] lg:col-span-4 lg:col-start-9 lg:aspect-[3/4]"
            imageClassName="object-[30%_60%]"
          />
        </div>
      </Container>
    </section>
  );
}
