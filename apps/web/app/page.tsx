import About from "@/components/About";
import ExperienceSection from "@/components/Experience";
import Hero from "@/components/hero/Hero";
  
export default function HomePage() {
  return (
    <>
      <Hero />
      {/* we'll add About + Projects next */}
      <section id="hero" className="h-screen flex items-center justify-center">
        <h2 className="text-5xl font-bold">Hi, I’m Hemang 👋</h2>
      </section>

          <About/>
        <ExperienceSection/>

      <section id="projects" className="min-h-screen flex items-center justify-center bg-neutral-900">
        <h2 className="text-3xl font-semibold">Projects Showcase</h2>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center">
        <h2 className="text-3xl font-semibold">Let’s Connect</h2>
      </section>
    </>
  );
}
