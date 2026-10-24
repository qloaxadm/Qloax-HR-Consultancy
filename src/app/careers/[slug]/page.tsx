import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowLink } from "@/components/ui/arrow-link";
import { LineReveal, delayStyle } from "@/components/ui/line-reveal";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { JobRow } from "@/components/jobs/job-row";
import { DevRecordsBadge } from "@/components/jobs/dev-records-badge";
import { JOBS, getJobBySlug } from "@/content/jobs";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return JOBS.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return {};
  return pageMetadata({
    title: job.isSample ? `${job.title} (sample role)` : job.title,
    description: job.summary,
    path: `/careers/${job.slug}`,
    noindex: job.isSample,
  });
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-4 text-base leading-relaxed text-ink/85">
          <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function JobPage({ params }: PageProps<"/careers/[slug]">) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  const related = [
    ...JOBS.filter((item) => item.slug !== job.slug && item.sector === job.sector),
    ...JOBS.filter((item) => item.slug !== job.slug && item.sector !== job.sector),
  ].slice(0, 3);

  const facts = [
    { label: "Location", value: job.location },
    { label: "Type", value: job.type },
    { label: "Arrangement", value: job.arrangement },
    { label: "Sector", value: job.sector },
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line">
        <div aria-hidden="true" className="hairline-grid absolute inset-0 -z-10 opacity-35" />
        <Container className="pb-14 pt-32 md:pb-20 md:pt-40">
          <Breadcrumbs items={[{ label: "Careers", href: "/careers" }, { label: job.title }]} />
          {job.isSample && (
            <div className="rise-in mt-10" style={delayStyle(40)}>
              <DevRecordsBadge label="Sample role — not a live vacancy" />
            </div>
          )}
          <p className="eyebrow rise-in mt-8 text-ink/80" style={delayStyle(80)}>
            {job.sector}
          </p>
          <LineReveal lines={[job.title]} startDelay={140} className="mt-5 max-w-5xl text-display font-medium text-ink" />
          <p className="rise-in mt-6 text-lead text-muted" style={delayStyle(320)}>
            {job.companyLabel}
          </p>
          <dl className="rise-in mt-10 flex flex-wrap gap-x-12 gap-y-5" style={delayStyle(420)}>
            {facts.slice(0, 3).map((fact) => (
              <div key={fact.label}>
                <dt className="eyebrow">{fact.label}</dt>
                <dd className="mt-1.5 text-base text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <p className="text-[clamp(1.375rem,1.1rem+0.9vw,2rem)] font-medium leading-snug tracking-[-0.02em] text-ink">
              {job.summary}
            </p>
            <h2 className="eyebrow mt-16">What you&apos;ll do</h2>
            <BulletList items={job.responsibilities} />
            <h2 className="eyebrow mt-14">What you&apos;ll bring</h2>
            <BulletList items={job.requirements} />
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-[2px] border border-line bg-surface p-7 lg:sticky lg:top-28 md:p-8">
              <dl className="divide-y divide-line">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex justify-between gap-6 py-3.5 text-sm">
                    <dt className="text-muted">{fact.label}</dt>
                    <dd className="text-right text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <Button href={`/apply/${job.slug}`} className="mt-7 w-full">
                Apply for this role
              </Button>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Not quite right?{" "}
                <Link href="/candidate-registration" className="text-ink underline decoration-line underline-offset-4 hover:decoration-accent">
                  Register your profile
                </Link>{" "}
                and we&apos;ll be in touch about relevant roles.
              </p>
            </div>
          </aside>
        </Container>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel label="More roles" />
              <h2 className="mt-6 text-title font-medium text-ink">Other opportunities</h2>
            </div>
            <ArrowLink href="/careers">View all roles</ArrowLink>
          </Reveal>
          <ul className="mt-10 border-t border-line">
            {related.map((item) => (
              <li key={item.slug}>
                <JobRow job={item} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
