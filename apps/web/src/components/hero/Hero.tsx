"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import HeroCanvas from "./HeroCanvas";
import Image from "next/image";
import { MailIcon, MapPin, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen relative h-[80vh] overflow-hidden bg-gradient-to-br from-gray-950 via-black to-gray-900">
      {/* 3D */}
        <HeroCanvas />

      {/* glow overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(59,130,246,0.18)_0%,transparent_60%)]" />

      {/* content */}
      <div className="flex items-center justify-center text-center h-full">
        <div className="relative z-10 px-6 space-y-8 transform transition-all duration-1000">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent pb-1">
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
                href="#experience"
                className="px-5 py-2 rounded-xl border border-white/30 text-white hover:bg-white/10 transition"
              >
                Experience
              </a>
            </div>
          </motion.div>
          <div className="flex flex-wrap gap-6 text-sm text-gray-300 dark:text-gray-200 mt-4">
            <div className="flex items-center gap-2">
              <MailIcon />
              <span>hemang2719@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone />
              <span>+91 9913156912</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin />
              <span>India</span>
            </div>
          </div>
        </div>
        <div
          className={`hero-image flex justify-center transform transition-all duration-1000 delay-300 translate-y-0 opacity-100
          }`}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <img
              src="/profileImage.png"
              className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
