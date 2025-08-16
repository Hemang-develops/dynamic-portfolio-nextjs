"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function Hero() {
  return (
    <section className="min-h-screen relative h-[80vh] min-h-[560px] overflow-hidden bg-gradient-to-br from-gray-950 via-black to-gray-900">
      {/* 3D */}
      <HeroCanvas />

      {/* glow overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(59,130,246,0.18)_0%,transparent_60%)]" />

      {/* content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Hemang Patel
          </h1>
          <p className="mt-4 text-base md:text-xl text-white/80">
            Frontend Engineer · React · Angular · Next.js
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <a
              href="#projects"
              className="px-5 py-2 rounded-xl bg-white text-gray-900 font-medium shadow hover:shadow-lg transition"
            >
              View Projects
            </a>
            <a
              href="/experience"
              className="px-5 py-2 rounded-xl border border-white/30 text-white hover:bg-white/10 transition"
            >
              Experience
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
