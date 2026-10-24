import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { StaggerGroup, StaggerItem } from "@/components/ui/stagger";
import { JobRow } from "@/components/jobs/job-row";
import { JobQuickSearch } from "@/components/jobs/job-quick-search";
import { getFeaturedJobs } from "@/content/jobs";

export function FeaturedJobs() {
  const jobs = getFeaturedJobs();

  return (
    <Section border>
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Open Opportunities"
            title="Your next move starts here."
            description="A sample of current search mandates, shown for development — not live vacancies."
          />
          <Reveal delay={0.1} className="sm:pb-1">
            <JobQuickSearch />
          </Reveal>
        </div>

        <StaggerGroup className="mt-14 border-b border-line lg:mt-16">
          {jobs.map((job) => (
            <StaggerItem key={job.slug}>
              <JobRow job={job} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-10 flex justify-center">
          <Button href="/careers" variant="secondary">
            View All Jobs
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
