import Hero from "@/components/sections/Hero";
import StatsBanner from "@/components/sections/StatsBanner";
import ClientCarousel from "@/components/sections/ClientCarousel";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Showreel from "@/components/sections/Showreel";
import Gallery from "@/components/sections/Gallery";
import AboutPreview from "@/components/sections/AboutPreview";
import ContactCTA from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <StatsBanner />
      <ClientCarousel />
      <Services />
      <Projects />
      <Showreel />
      <Gallery />
      <AboutPreview />
      <ContactCTA />
    </main>
  );
}
