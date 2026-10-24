import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { CandidateRegistrationForm } from "@/components/forms/candidate-registration-form";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Candidate Registration",
  description:
    "Introduce yourself to Vantage People. Share your experience and career goals so we can consider you for relevant opportunities.",
  path: "/candidate-registration",
});

const NEXT_STEPS = [
  "We read your profile and note the roles you're interested in",
  "When a relevant opportunity comes up, we'll get in touch",
  "Your details are never shared with an employer without your agreement",
];

export default function CandidateRegistrationPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Candidate registration" }]}
        eyebrow="For candidates"
        title={["Introduce yourself."]}
        description="Tell us about your experience and what you're looking for next. We'll consider you for relevant roles as they come up."
      />

      <section className="py-16 md:py-24">
        <Container className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <aside className="space-y-10 lg:col-span-4">
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
            <div className="rounded-[2px] border border-line bg-surface p-7">
              <p className="text-base font-medium text-ink">Looking at a specific role?</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                You can also apply directly from any job page.
              </p>
              <Link
                href="/careers"
                className="mt-5 inline-block text-sm text-ink underline decoration-line underline-offset-4 hover:decoration-accent"
              >
                Browse roles
              </Link>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              Read how we handle your information in our{" "}
              <Link href="/privacy-policy" className="text-ink underline decoration-line underline-offset-4 hover:decoration-accent">
                privacy policy
              </Link>
              .
            </p>
          </aside>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="rounded-[2px] border border-line bg-surface/40 p-6 sm:p-10">
              <CandidateRegistrationForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
