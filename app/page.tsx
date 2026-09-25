import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesPreview from "@/components/home/ServicesPreview";
import ProcessSection from "@/components/home/ProcessSection";
import AccoladesPreview from "@/components/home/AccoladesPreview";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <ProcessSection />
      <AccoladesPreview />
      <CTASection />
    </>
  );
}