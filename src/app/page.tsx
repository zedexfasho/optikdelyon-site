import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Categories from "@/components/Categories";
import Process from "@/components/Process";
import MedicalTrust from "@/components/MedicalTrust";
import About from "@/components/About";
import StylesCarousel from "@/components/StylesCarousel";
import Gallery from "@/components/Gallery";
import Values from "@/components/Values";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Categories />
      <Process />
      <MedicalTrust />
      <About />
      <StylesCarousel />
      <Gallery />
      <Values />
      <CTA />
    </>
  );
}
