import Link from "next/link";
import { LegalPage } from "@/components/layout/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms and Conditions",
  description: "The terms that apply when you use the Vantage People website.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions" label="Terms and Conditions">
      <p>
        These terms apply to your use of this website, operated by [Company legal name]. By using the site, you agree
        to them. Effective date: [to be confirmed].
      </p>

      <h2>Using this website</h2>
      <p>
        You may use this website to learn about our services, browse roles, and contact us. Please do not misuse the
        site — for example, by submitting false information, uploading harmful files, or attempting to disrupt it.
      </p>

      <h2>Job listings</h2>
      <p>
        We aim to keep listings accurate and current, but roles may change or close without notice. A listing is not an
        offer of employment, and submitting an application does not guarantee an interview or a role. Roles marked as
        samples are illustrative and are not live vacancies.
      </p>

      <h2>Recruitment services</h2>
      <p>
        Recruitment services for employers are provided under a separate written agreement. Nothing on this website
        forms part of that agreement.
      </p>

      <h2>Content and intellectual property</h2>
      <p>
        The content and design of this website belong to Vantage People or its licensors. Photography is used under the
        Unsplash License. You may not reproduce site content for commercial purposes without permission.
      </p>

      <h2>Links to other websites</h2>
      <p>We are not responsible for the content or practices of websites we link to.</p>

      <h2>Liability</h2>
      <p>
        The website is provided &ldquo;as is&rdquo;. To the extent permitted by law, we are not liable for losses arising
        from your use of it. [Liability terms to be confirmed by legal counsel.]
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of [jurisdiction to be confirmed].</p>

      <h2>Questions</h2>
      <p>
        If you have questions about these terms, please <Link href="/contact">contact us</Link>.
      </p>
    </LegalPage>
  );
}
