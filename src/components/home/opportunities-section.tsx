import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ArrowLink } from "@/components/ui/arrow-link";
import { StaggerGroup, StaggerItem } from "@/components/ui/stagger";
import { JobRow } from "@/components/jobs/job-row";
import { JobQuickSearch } from "@/components/jobs/job-quick-search";
import { DevRecordsBadge } from "@/components/jobs/dev-records-badge";
import { getFeaturedJobs } from "@/content/jobs";

export function OpportunitiesSection() {
  const jobs = getFeaturedJobs();

  return (
    <section className="border-t border-line py-24 md:py-32 lg:py-40">
      <Container>
        <div className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <Reveal className="lg:col-span-7">
            <SectionLabel index="05" label="Opportunities" />
            <h2 className="mt-6 text-display font-medium text-ink">Your next move starts here.</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            <DevRecordsBadge />
          </Reveal>
        </div>

        <Reveal className="mt-12 md:mt-16">
          <JobQuickSearch />
        </Reveal>

        <div className="mt-12">
          <div className="hidden border-b border-line pb-4 md:grid md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_7rem_6.5rem_2rem] md:gap-6 md:px-4">
            {["Role", "Location", "Type", "Arrangement"].map((heading) => (
              <span key={heading} className="eyebrow">
                {heading}
              </span>
            ))}
          </div>
          <StaggerGroup stagger={0.06} className="border-t border-line md:border-t-0">
            {jobs.map((job) => (
              <StaggerItem key={job.slug} y={14}>
                <JobRow job={job} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <Reveal className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Button href="/careers" variant="secondary">
            View all roles
          </Button>
          <ArrowLink href="/candidate-registration">Not seeing the right role? Register your profile</ArrowLink>
        </Reveal>
      </Container>
    </section>
  );
}
