import About from "@/components/About";
import Contacts from "@/components/Contacts";
import ExperienceSection from "@/components/Experience";
import ProjectsSection from "@/components/Projects";
import Skills from "@/components/Skills";
import Hero from "@/components/hero/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ExperienceSection />
      <ProjectsSection />
      <Skills />
      <Contacts />
    </>
  );
}
