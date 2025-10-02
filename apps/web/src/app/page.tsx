import About from "@/components/About";
import Contacts from "@/components/Contacts";
import ExperienceSection from "@/components/Experience";
import ProjectsSection from "@/components/Projects";
import Skills from "@/components/Skills";
import Hero from "@/components/hero/Hero";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <>
      <Hero data={content.hero} />
      <About data={content.about} />
      <ExperienceSection data={content.experience} />
      <ProjectsSection data={content.projects} />
      <Skills data={content.skills} />
      <Contacts data={content.contact} />
    </>
  );
}
