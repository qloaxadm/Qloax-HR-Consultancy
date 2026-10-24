import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/ui/container";
import { LineReveal, delayStyle } from "@/components/ui/line-reveal";
import { DevRecordsBadge } from "@/components/jobs/dev-records-badge";
import { JobApplicationForm } from "@/components/forms/job-application-form";
import { JOBS, getJobBySlug } from "@/content/jobs";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return JOBS.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: PageProps<"/apply/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return {};
  return pageMetadata({
    title: `Apply — ${job.title}`,
    description: `Apply for the ${job.title} role.`,
    path: `/apply/${job.slug}`,
    noindex: true,
  });
}

const NEXT_STEPS = [
  "A consultant reviews your application against the brief",
  "If there's a fit, we'll contact you for an initial conversation",
  "We only share your details with an employer once you've agreed",
];

export default async function ApplyPage({ params }: PageProps<"/apply/[slug]">) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line">
        <div aria-hidden="true" className="hairline-grid absolute inset-0 -z-10 opacity-35" />
        <Container className="pb-14 pt-32 md:pb-20 md:pt-40">
          <Breadcrumbs
            items={[
              { label: "Careers", href: "/careers" },
              { label: job.title, href: `/careers/${job.slug}` },
              { label: "Apply" },
            ]}
          />
          <p className="eyebrow rise-in mt-10 text-ink/80" style={delayStyle(60)}>
            Application
          </p>
          <LineReveal lines={["Apply for", job.title]} startDelay={120} className="mt-5 max-w-5xl text-display font-medium text-ink" />
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <aside className="space-y-10 lg:col-span-4">
            <div className="rounded-[2px] border border-line bg-surface p-7">
              {job.isSample && <DevRecordsBadge label="Sample role" className="mb-6" />}
              <p className="text-xl font-medium tracking-[-0.015em] text-ink">{job.title}</p>
              <p className="mt-1.5 text-sm text-muted">{job.companyLabel}</p>
              <p className="mt-5 text-sm text-ink/85">
                {job.location} · {job.type} · {job.arrangement}
              </p>
              <Link
                href={`/careers/${job.slug}`}
                className="mt-6 inline-block text-sm text-ink underline decoration-line underline-offset-4 hover:decoration-accent"
              >
                Review the role
              </Link>
            </div>
            <div>
              <p className="eyebrow">What happens next</p>
              <ol className="mt-5 space-y-4">
                {NEXT_STEPS.map((step, index) => (
                  <li key={step} className="flex gap-4 text-sm leading-relaxed text-ink/85">
                    <span className="font-mono text-xs leading-5 text-accent">{String(index + 1).padStart(2, "0")}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              We use your details only to assess your application. Read how we handle personal information in our{" "}
              <Link href="/privacy-policy" className="text-ink underline decoration-line underline-offset-4 hover:decoration-accent">
                privacy policy
              </Link>
              .
            </p>
          </aside>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="rounded-[2px] border border-line bg-surface/40 p-6 sm:p-10">
              <JobApplicationForm jobSlug={job.slug} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
