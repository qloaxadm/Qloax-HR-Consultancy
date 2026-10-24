import { PageHero } from "@/components/layout/page-hero";
import { SplitCta } from "@/components/layout/split-cta";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MaskImage } from "@/components/ui/mask-image";
import { JobBoard } from "@/components/jobs/job-board";
import { DevRecordsBadge } from "@/components/jobs/dev-records-badge";
import { JOBS, JOB_ARRANGEMENTS, JOB_LOCATIONS, JOB_TYPES } from "@/content/jobs";
import { MEDIA } from "@/content/media";
import { parseJobFilters } from "@/lib/jobs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Careers",
  description:
    "Browse the roles we're recruiting for, filter by location, job type, and work arrangement, or register your profile for future opportunities.",
  path: "/careers",
});

export default async function CareersPage({ searchParams }: PageProps<"/careers">) {
  const filters = parseJobFilters(await searchParams);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Careers" }]}
        eyebrow="Careers"
        title={["Your next move", "starts here."]}
        description="Browse the roles we're working on, or register your profile so we can match you with opportunities as they come up."
        actions={
          <Button href="/candidate-registration" variant="secondary">
            Register your profile
          </Button>
        }
        aside={
          <MaskImage
            media={MEDIA.museumLobby}
            sizes="(min-width: 1024px) 28vw, 1px"
            eager
            className="hidden aspect-[4/5] lg:block"
            imageClassName="object-[50%_62%]"
          />
        }
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="mb-14 flex flex-col gap-4 rounded-[2px] border border-line bg-surface/50 p-5 md:flex-row md:items-center md:gap-8">
            <DevRecordsBadge className="shrink-0" />
            <p className="text-sm leading-relaxed text-muted">
              These illustrative roles demonstrate search, filtering, and applications. Live vacancies will appear
              here once an applicant tracking system is connected.
            </p>
          </div>
          <JobBoard
            jobs={JOBS}
            initialFilters={filters}
            locations={JOB_LOCATIONS}
            types={JOB_TYPES}
            arrangements={JOB_ARRANGEMENTS}
          />
        </Container>
      </section>

      <SplitCta />
    </>
  );
}
