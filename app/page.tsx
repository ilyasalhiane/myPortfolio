import { Certifications } from "@/components/Certifications";
import { Hero } from "@/components/Hero";
import { TelemetryBackground } from "@/components/effects/TelemetryBackground";
import { AboutSection } from "@/components/sections/AboutSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { Footer } from "@/components/sections/Footer";
import { HighlightsSection } from "@/components/sections/HighlightsSection";
import { Navbar } from "@/components/sections/Navbar";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <TelemetryBackground />
      <Navbar />
      <main id="main">
        <Hero />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <HighlightsSection />
        <Certifications />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
