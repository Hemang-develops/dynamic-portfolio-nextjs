import Hero from "@/components/hero/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* we'll add About + Projects next */}
      <section id="about" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">About</h2>
        <p className="text-gray-300 max-w-2xl">
          I build high-quality, animated, and performant web experiences using React, Angular, and Next.js.
        </p>
      </section>
    </>
  );
}
