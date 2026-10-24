import Link from "next/link";
import { LegalPage } from "@/components/layout/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Vantage People collects, uses, and protects personal information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" label="Privacy Policy">
      <p>
        This policy explains how [Company legal name] (&ldquo;Vantage People&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
        collects and uses personal information when you use this website or work with us. Effective date: [to be
        confirmed].
      </p>

      <h2>Information we collect</h2>
      <p>We collect the information you choose to give us through our forms:</p>
      <ul>
        <li>Contact details such as your name, email address, and phone number.</li>
        <li>Professional details such as your current role, industry, experience level, and profile links.</li>
        <li>Your resume or CV, if you upload one, and any notes you include with an application.</li>
        <li>For employers, details about your organization and the roles you are hiring for.</li>
      </ul>
      <p>
        Our hosting provider may process basic technical data (such as IP addresses) in server logs to keep the site
        secure. This site does not currently use analytics or advertising cookies.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to your enquiry or application.</li>
        <li>To assess your suitability for roles and contact you about relevant opportunities.</li>
        <li>To discuss and deliver recruitment services to employers.</li>
        <li>To meet our legal and regulatory obligations.</li>
      </ul>
      <p>
        We only share a candidate&apos;s details with a prospective employer after the candidate has agreed. We do not sell
        personal information.
      </p>

      <h2>Legal basis</h2>
      <p>
        Depending on where you are located, we rely on your consent, our legitimate interests in providing recruitment
        services, or steps taken at your request before entering into an agreement. [Applicable jurisdictions and legal
        bases to be confirmed.]
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep personal information only for as long as it is needed for the purposes above, after which it is
        deleted or anonymized. [Retention periods to be confirmed.]
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask to access, correct, or delete the personal information we hold about you, or withdraw your consent
        at any time. To make a request, please <Link href="/contact">contact us</Link>.
      </p>

      <h2>Security</h2>
      <p>
        We apply reasonable technical and organizational measures to protect personal information, including checks on
        uploaded files. No method of transmission or storage is completely secure.
      </p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. The latest version will always be available on this page.</p>
    </LegalPage>
  );
}
