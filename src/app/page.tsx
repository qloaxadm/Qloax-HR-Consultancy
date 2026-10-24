import { Hero } from "@/components/home/hero";
import { DisciplinesStrip } from "@/components/home/disciplines-strip";
import { Consultancy } from "@/components/home/consultancy";
import { ServicesSection } from "@/components/home/services-section";
import { IndustriesSection } from "@/components/home/industries-section";
import { ProcessSection } from "@/components/home/process-section";
import { OpportunitiesSection } from "@/components/home/opportunities-section";
import { EmployerCta } from "@/components/home/employer-cta";
import { CandidateCta } from "@/components/home/candidate-cta";
import { InsightsSection } from "@/components/home/insights-section";
import { FinalCta } from "@/components/home/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DisciplinesStrip />
      <Consultancy />
      <ServicesSection />
      <IndustriesSection />
      <ProcessSection index="04" />
      <OpportunitiesSection />
      <EmployerCta />
      <CandidateCta />
      <InsightsSection />
      <FinalCta />
    </>
  );
}
