"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import HeroCanvas from "./HeroCanvas";
import {
  Github,
  Link as LinkIcon,
  Linkedin,
  MailIcon,
  MapPin,
  Phone,
} from "lucide-react";
import type { HeroContent, HeroIcon } from "@portfolio-content/schema";

const ICON_MAP: Record<HeroIcon, ComponentType<{ className?: string }>> = {
  mail: MailIcon,
  phone: Phone,
  location: MapPin,
  linkedin: Linkedin,
  github: Github,
  link: LinkIcon,
};

export default function Hero({ data }: { data: HeroContent }) {
  return (
    <section className="min-h-screen relative h-[80vh] overflow-hidden bg-gradient-to-br from-gray-950 via-black to-gray-900 pt-32 md:pt-40">
      {/* glow overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(59,130,246,0.18)_0%,transparent_60%)]" />

      {/* layout */}
      <div className="flex flex-col md:flex-row items-center justify-around h-full px-10 md:px-50">
        {/* left side (blob + text) */}
        <div className="relative flex-1 max-w-xl z-10">
          {/* blob behind text */}
          <div className="absolute -left-10 -top-30 w-[500px] h-[500px] -z-10 hidden lg:block">
            <HeroCanvas />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent pb-1">
              {data.name}
            </h1>
            <p className="text-base md:text-xl text-white/80">
              {data.tagline}
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href={data.primaryCta.href}
                className="px-5 py-2 rounded-xl bg-white text-gray-900 font-medium shadow hover:shadow-lg transition"
              >
                {data.primaryCta.label}
              </a>
              <a
                href={data.secondaryCta.href}
                className="px-5 py-2 rounded-xl border border-white/30 text-white hover:bg-white/10 transition"
              >
                {data.secondaryCta.label}
              </a>
            </div>

            {/* contact info */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-300 mt-6">
              {data.quickLinks.map((link) => {
                const Icon = ICON_MAP[link.icon];
                return (
                  <a
                    key={`${link.icon}-${link.label}`}
                    href={link.href}
                    className="flex items-center gap-2 hover:text-white transition"
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* right side (profile image) */}
        <div className="flex justify-center flex-1">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <img
              src={data.profileImage}
              className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full object-cover shadow-2xl border-4 border-white/10"
              alt={`${data.name} portrait`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
