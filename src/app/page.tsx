import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { Introduction } from "@/components/sections/introduction";
import { ServicesOverview } from "@/components/sections/services-overview";
import { IndustriesOverview } from "@/components/sections/industries-overview";
import { Methodology } from "@/components/sections/methodology";
import { FeaturedJobs } from "@/components/sections/featured-jobs";
import { EmployerCta } from "@/components/sections/employer-cta";
import { CandidateCta } from "@/components/sections/candidate-cta";
import { InsightsPreview } from "@/components/sections/insights-preview";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Introduction />
      <ServicesOverview />
      <IndustriesOverview />
      <Methodology />
      <FeaturedJobs />
      <EmployerCta />
      <CandidateCta />
      <InsightsPreview />
      <FinalCta />
    </>
  );
}
